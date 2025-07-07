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
    console.log(`[CSS-ANIM] Registering component: ${component.key}`);
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
    console.log(`[CSS-ANIM] Setting state "${stateName}" for component: ${componentKey}`);
    const state = get();
    const component = state.components[componentKey];
    if (!component) {
      console.warn(`[CSS-ANIM] Component "${componentKey}" not found.`);
      return;
    }

    const nextState = component.states.find((s) => s.name === stateName);
    if (!nextState) {
      console.warn(`[CSS-ANIM] State "${stateName}" not found for component "${componentKey}".`);
      return;
    }

    // Se esiste un timer attivo per questo componente, lo cancello
    const prevTimer = state.timers[componentKey];
    if (prevTimer) {
      clearTimeout(prevTimer);
      console.log(`[CSS-ANIM] Cleared previous timer for component: ${componentKey}`);
    }

    // Aggiorno subito lo stato
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

    // Se la nuova animazione ha una durata e un resetTo, imposto il nuovo timer
    if (nextState.duration && nextState.resetTo) {
      console.log(
        `[CSS-ANIM] Scheduling reset to "${nextState.resetTo}" in ${nextState.duration} ms for component: ${componentKey}`
      );
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
    console.log(`[CSS-ANIM] Clearing state for component: ${componentKey}`);
    const state = get();
    const component = state.components[componentKey];
    if (!component) {
      console.warn(`[CSS-ANIM] Component "${componentKey}" not found.`);
      return;
    }

    // Cancello eventuale timer attivo
    const prevTimer = state.timers[componentKey];
    if (prevTimer) {
      clearTimeout(prevTimer);
      console.log(`[CSS-ANIM] Cleared timer during clear for component: ${componentKey}`);
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
    console.log(`[CSS-ANIM] Getting current state for component: ${componentKey}`);
    return get().components[componentKey]?.currentState;
  },

  useComponentState: (componentKey): CssAnimationState | undefined => {
    return useCssAnimationStore((state) => state.components[componentKey]?.currentState);
  }
}));
