'use client';

import { create } from 'zustand';

export type CssAnimationState = {
  name: string;
  cssClass: string;
  duration?: number; // in ms
  resetTo?: string;
};

export type CssAnimationComponent = {
  key: string;
  states: CssAnimationState[];
  currentState?: CssAnimationState;
};

type InternalTimers = Record<string, ReturnType<typeof setTimeout> | undefined>;

type CssAnimationStore = {
  components: Record<string, CssAnimationComponent>;
  timers: InternalTimers;

  registerComponent: (component: CssAnimationComponent) => void;

  setComponentState: (componentKey: string, stateName: string) => void;

  clearComponentState: (componentKey: string) => void;

  getComponentState: (componentKey: string) => CssAnimationState | undefined;

  useComponentState: (componentKey: string) => CssAnimationState | undefined;
};

export const useCssAnimationStore = create<CssAnimationStore>((set, get) => ({
  components: {},
  timers: {},

  registerComponent: (component) => {
    set((state) => {
      const existing = state.components[component.key];
      return {
        components: {
          ...state.components,
          [component.key]: {
            ...component,
            currentState: existing?.currentState ?? component.currentState
          }
        }
      };
    });
  },

  setComponentState: (componentKey, stateName) => {
    const state = get();
    const component = state.components[componentKey];
    if (!component) {
      return;
    }

    const nextState = component.states.find((s) => s.name === stateName);
    if (!nextState) {
      return;
    }

    const prevTimer = state.timers[componentKey];
    if (prevTimer) {
      clearTimeout(prevTimer);
    }

    set((state) => ({
      components: {
        ...state.components,
        [componentKey]: {
          ...component,
          currentState: nextState
        }
      },
      timers: {
        ...state.timers,
        [componentKey]: undefined
      }
    }));

    if (nextState.duration && nextState.resetTo) {
      const timer = setTimeout(() => {
        get().setComponentState(componentKey, nextState.resetTo!);
      }, nextState.duration);

      set((state) => ({
        timers: {
          ...state.timers,
          [componentKey]: timer
        }
      }));
    }
  },

  clearComponentState: (componentKey) => {
    const state = get();
    const component = state.components[componentKey];
    if (!component) {
      return;
    }

    const prevTimer = state.timers[componentKey];
    if (prevTimer) {
      clearTimeout(prevTimer);
    }

    set((state) => ({
      components: {
        ...state.components,
        [componentKey]: {
          ...component,
          currentState: undefined
        }
      },
      timers: {
        ...state.timers,
        [componentKey]: undefined
      }
    }));
  },

  getComponentState: (componentKey) => {
    return get().components[componentKey]?.currentState;
  },

  useComponentState: (componentKey): CssAnimationState | undefined => {
    return useCssAnimationStore((state) => state.components[componentKey]?.currentState);
  }
}));
