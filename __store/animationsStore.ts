import { create } from 'zustand';

export type RiveInput = {
  name: string;
  type: 'number' | 'boolean' | 'trigger';
  value?: number | boolean;
};

export type AnimationInstance = {
  rive: any | null;
  inputs: RiveInput[];
  isPlaying: boolean;
};

export type AnimationInstances = {
  [animationName: string]: AnimationInstance;
};

type AnimationStore = {
  animations: AnimationInstances;

  register: (name: string, riveInstance: any, inputs: RiveInput[]) => void;
  setInput: (name: string, inputName: string, value: number | boolean) => void;
  fireTrigger: (name: string, triggerName: string) => void;
  play: (name: string) => void;
  pause: (name: string) => void;
  reset: (name: string) => void;
  getInputs: (name: string) => RiveInput[] | undefined;
};

export const useAnimationsStore = create<AnimationStore>((set, get) => ({
  animations: {},

  register: (name, riveInstance, inputs) =>
    set((state) => ({
      animations: {
        ...state.animations,
        [name]: {
          rive: riveInstance,
          inputs,
          isPlaying: false
        }
      }
    })),

  setInput: (name, inputName, value) => {
    const anim = get().animations[name];
    if (!anim) return;

    const inputObj = anim.rive
      ?.stateMachineInputs('State Machine 1')
      ?.find((i: any) => i.name === inputName);

    if (inputObj) {
      inputObj.value = value;
    }

    set((state) => ({
      animations: {
        ...state.animations,
        [name]: {
          ...anim,
          inputs: anim.inputs.map((i) => (i.name === inputName ? { ...i, value } : i))
        }
      }
    }));
  },

  fireTrigger: (name, triggerName) => {
    const anim = get().animations[name];
    if (!anim) return;

    const inputObj = anim.rive
      ?.stateMachineInputs('State Machine 1')
      ?.find((i: any) => i.name === triggerName);

    if (inputObj?.fire) {
      inputObj.fire();
    }
  },

  play: (name) => {
    const anim = get().animations[name];
    if (!anim) return;

    anim.rive?.play?.();

    set((state) => ({
      animations: {
        ...state.animations,
        [name]: {
          ...anim,
          isPlaying: true
        }
      }
    }));
  },

  pause: (name) => {
    const anim = get().animations[name];
    if (!anim) return;

    anim.rive?.pause?.();

    set((state) => ({
      animations: {
        ...state.animations,
        [name]: {
          ...anim,
          isPlaying: false
        }
      }
    }));
  },

  reset: (name) => {
    const anim = get().animations[name];
    if (!anim) return;

    anim.rive?.pause?.();

    anim.inputs.forEach((input) => {
      const inputObj = anim.rive
        ?.stateMachineInputs('State Machine 1')
        ?.find((i: any) => i.name === input.name);
      if (inputObj) {
        if (input.type === 'boolean') {
          inputObj.value = false;
        } else if (input.type === 'number') {
          inputObj.value = 0;
        }
      }
    });

    set((state) => ({
      animations: {
        ...state.animations,
        [name]: {
          rive: anim.rive,
          inputs: anim.inputs.map((i) => ({
            ...i,
            value: i.type === 'boolean' ? false : i.type === 'number' ? 0 : i.value
          })),
          isPlaying: false
        }
      }
    }));
  },

  getInputs: (name) => {
    return get().animations[name]?.inputs;
  }
}));
