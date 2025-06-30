import { Flow } from '__flows/_flow';
import { questionsFlow } from '__flows/subscription/subscriptionFlow';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FlowInstance = {
  currentNodeId: string | null;
  data: Record<string, any>;
  flow: Flow;
  history: string[];
};

export type FlowInstances = {
  subscription: FlowInstance;
};

type FlowName = keyof FlowInstances;

type FlowsStore = {
  flows: FlowInstances;
  start: (flowName: FlowName) => void;
  setCurrentNodeId: (flowName: FlowName, nodeId: string) => void;
  updateData: (flowName: FlowName, data: Record<string, any>) => void;
  reset: (flowName: FlowName) => void;
  goBack: (flowName: FlowName) => void;
  getData: (flowName: FlowName) => Record<string, any>;
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
        },
        profileUpdate: {
          currentNodeId: null,
          data: {},
          flow: { startingNodeId: 'start', steps: {}, translations: 'flows.profileUpdate' }, // placeholder
          history: []
        }
      },

      start: (flowName) =>
        set((state) => {
          const flow = state.flows[flowName];
          const currentNode = flow.currentNodeId ?? flow.flow.startingNodeId;
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...flow,
                currentNodeId: currentNode
              }
            }
          };
        }),

      setCurrentNodeId: (flowName, nodeId) =>
        set((state) => {
          const flow = state.flows[flowName];
          const { currentNodeId, history } = flow;
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...flow,
                currentNodeId: nodeId,
                history: currentNodeId ? [...history, currentNodeId] : history
              }
            }
          };
        }),

      updateData: (flowName, data) =>
        set((state) => {
          const flow = state.flows[flowName];
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...flow,
                data: {
                  ...flow.data,
                  ...data
                }
              }
            }
          };
        }),

      reset: (flowName) =>
        set((state) => {
          const flow = state.flows[flowName];
          return {
            flows: {
              ...state.flows,
              [flowName]: {
                ...flow,
                currentNodeId: flow.flow.startingNodeId,
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
        flows: Object.fromEntries(
          Object.entries(state.flows).map(([name, flow]) => [
            name,
            {
              ...flow,
              flow: undefined as unknown as Flow
            }
          ])
        ) as FlowInstances
      }),
      merge: (persistedState, currentState) => {
        const safeCurrent = currentState ?? {};
        const safePersisted = persistedState ?? {};

        const restored = {
          ...safeCurrent,
          ...safePersisted
        };

        if (restored.flows) {
          if (restored.flows.subscription) {
            restored.flows.subscription.flow = questionsFlow;
          }
          if (restored.flows.profileUpdate) {
            // es. import flow reale
            restored.flows.profileUpdate.flow = {
              startingNodeId: 'start',
              steps: {},
              translations: 'flows.profileUpdate'
            };
          }
        }

        return restored;
      }
    }
  )
);
