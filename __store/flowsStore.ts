// Store Zustand specifico per gestire i flow, a partire da "subscription"
import { Flow } from '__flows/_flow';
import { questionsFlow } from '__flows/subscription/subscriptionFlow';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FlowInstances = {
  subscription: {
    currentNodeId: string | null;
    data: Record<string, any>;
    flow: Flow;
    history: string[];
  };
};

type FlowsStore = {
  flows: FlowInstances;
  start: (flowName: keyof FlowInstances) => void;
  setCurrentNodeId: (flowName: keyof FlowInstances, nodeId: string) => void;
  updateData: (flowName: keyof FlowInstances, data: Record<string, any>) => void;
  reset: (flowName: keyof FlowInstances) => void;
  goBack: (flowName: keyof FlowInstances) => void;
  getData: (flowName: keyof FlowInstances) => Record<string, any>;
};

export const useFlowsStore = create<FlowsStore>()(
  persist(
    (set, get) => ({
      flows: {
        subscription: {
          currentNodeId: null,
          data: {},
          flow: questionsFlow,
          history: []
        }
      },

      start: (flowName) =>
        set((state) => {
          const currentNode =
            state.flows[flowName].currentNodeId ?? state.flows[flowName].flow.startingNodeId;
          console.log(
            'start',
            state.flows[flowName].currentNodeId,
            state.flows[flowName].flow.startingNodeId
          );
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...state.flows[flowName],
                currentNodeId: currentNode,
                data: state.flows[flowName].data,
                history: state.flows[flowName].history
              }
            }
          };
        }),

      setCurrentNodeId: (flowName, nodeId) =>
        set((state) => {
          const { currentNodeId, history } = state.flows[flowName];
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...state.flows[flowName],
                currentNodeId: nodeId,
                history: currentNodeId ? [...history, currentNodeId] : history
              }
            }
          };
        }),

      updateData: (flowName, data) =>
        set((state) => ({
          flows: {
            ...state.flows,
            [flowName]: {
              ...state.flows[flowName],
              data: {
                ...state.flows[flowName].data,
                ...data
              }
            }
          }
        })),

      reset: (flowName) =>
        set((state) => {
          const startingNode = state.flows[flowName].flow.startingNodeId;
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...state.flows[flowName],
                currentNodeId: startingNode,
                data: {},
                history: []
              }
            }
          };
        }),

      goBack: (flowName) =>
        set((state) => {
          const flow = state.flows[flowName];
          const { history, data, flow: flowDef } = flow;

          if (history.length === 0) return {};

          const newHistory = [...history];
          const previousNode = newHistory.pop() || null;
          const currentNodeId = flow.currentNodeId;

          const currentStep = flowDef.steps[currentNodeId ?? ''];
          const key = (currentStep?.resolver as any)?.schema?._def?.shape?.key || currentNodeId;

          const updatedData = { ...data };
          if (key && updatedData[key]) {
            delete updatedData[key];
          }

          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...flow,
                currentNodeId: previousNode,
                history: newHistory,
                data: updatedData
              }
            }
          };
        }),

      getData: (flowName) => {
        return get().flows[flowName].data;
      }
    }),
    {
      name: 'flows-store',
      partialize: (state) => ({
        flows: {
          subscription: {
            ...state.flows.subscription,
            flow: undefined as unknown as Flow // non persistiamo la definizione del flow
          }
        }
      }),
      merge: (persistedState, currentState) => {
        const safeCurrent = (currentState ?? {}) as any;
        const safePersisted = (persistedState ?? {}) as any;
        const restored = {
          ...safeCurrent,
          ...safePersisted
        };
        if (restored.flows && restored.flows.subscription) {
          restored.flows.subscription.flow = questionsFlow;
        }
        return restored;
      }
    }
  )
);
