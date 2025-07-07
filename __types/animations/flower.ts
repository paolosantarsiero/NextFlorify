import { CssAnimationComponent, CssAnimationState } from '@/__store/cssAnimationsStore';

export const flowerLoadingStatic: CssAnimationState = {
  name: 'flowerLoadingStatic',
  cssClass: ''
};

export const flowerLoading: CssAnimationState = {
  name: 'flowerLoading',
  cssClass: 'animated',
  duration: 3000,
  resetTo: 'flowerLoadingStatic'
};

export const flowerAnimation: CssAnimationComponent = {
  key: 'flower-spinner',
  states: [flowerLoadingStatic, flowerLoading]
};
