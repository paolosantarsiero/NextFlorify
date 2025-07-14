import { CssAnimationComponent, CssAnimationState } from '@/__store/cssAnimationsStore';

export enum FlowerAnimationStates {
  LOADING = 'flowerLoading',
  LOADING_STATIC = 'flowerLoadingStatic',
  HIDDEN = 'flowerHidden'
}

export const flowerHidden: CssAnimationState = {
  name: FlowerAnimationStates.HIDDEN,
  cssClass: 'hidden'
};

export const flowerLoadingStatic: CssAnimationState = {
  name: FlowerAnimationStates.LOADING_STATIC,
  cssClass: ''
};

export const flowerLoading: CssAnimationState = {
  name: FlowerAnimationStates.LOADING,
  cssClass: 'animated',
  duration: 1300,
  resetTo: 'flowerLoadingStatic'
};

export const FLOWER_ANIMATION_NAME = 'flower-spinner';

export const flowerAnimation: CssAnimationComponent = {
  key: FLOWER_ANIMATION_NAME,
  states: [flowerLoadingStatic, flowerLoading, flowerHidden]
};
