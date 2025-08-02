import { CssAnimationComponent, CssAnimationState } from '@/__store/cssAnimationsStore';

enum CloudAnimationStates {
  LOADING = 'cloudLoading',
  LOADING_STATIC = 'cloudLoadingStatic'
}

export const cloudLoadingStatic: CssAnimationState = {
  name: 'cloudLoadingStatic',
  cssClass: ''
};

export const cloudLoading: CssAnimationState = {
  name: 'cloudLoading',
  cssClass: 'animated',
  duration: 1300,
  resetTo: 'cloudLoadingStatic'
};

export const cloudAnimation: CssAnimationComponent = {
  key: 'cloud-spinner',
  states: [cloudLoadingStatic, cloudLoading]
};
