import { FLOWER_ANIMATION_NAME, FlowerAnimationStates } from '@/__types/animations/flower';
import { getSpecificDayByAnniversary } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import {
  AnniversaryEnum,
  AnniversarySchema,
  AnniversaryType,
  ColorEnum,
  ColorSchema,
  ColorType,
  DayEnum,
  DaySchema,
  DayType,
  ForEnum,
  ForSchema,
  ForType,
  FrequencyEnum,
  FrequencySchema,
  FrequencyType,
  NotesSchema,
  NotesType,
  PackagingEnum,
  PackagingSchema,
  PackagingType,
  PathEnum,
  PathSchema,
  PathType,
  PreferenceEnum,
  PreferenceSchema,
  PreferenceType,
  SizeEnum,
  SizeSchema,
  SizeType,
  SpecificDaySchema,
  SpecificDayType,
  SubscriptionFlowDataType,
  SurpriseEnum,
  SurpriseSchema,
  SurpriseType,
  VaseEnum,
  VaseSchema,
  VaseType
} from '__flows/subscription/subscriptionQuestionsSchema';

export const PATH_NODE = 'path';
export const PREFERENCE_NODE = 'preference';
export const SIZE_NODE = 'size';
export const COLOR_NODE = 'color';
export const PACKAGING_NODE = 'packaging';
export const FREQUENCY_NODE = 'frequency';
export const DAY_NODE = 'day';
export const VASE_NODE = 'vase';
export const SURPRISE_NODE = 'surprise';
export const FOR_WHOM_NODE = 'for';
export const ANNIVERSARIES_NODE = 'anniversaries';
export const SPECIFIC_DAY_NODE = 'specificDay';
export const NOTES_NODE = 'notes';

const PathNode: FlowNode<PathType, SubscriptionFlowDataType> = {
  id: PATH_NODE,
  component: undefined,
  resolver: zodResolver(PathSchema),
  riveState: (data: SubscriptionFlowDataType) => {
    return 'watching';
  },
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: PathType) =>
    data.path === 'myself'
      ? PREFERENCE_NODE
      : data.path === 'other'
        ? FOR_WHOM_NODE
        : FOR_WHOM_NODE,
  inputType: 'buttonSelect',
  answers: PathEnum
};

const preferenceNode: FlowNode<PreferenceType, SubscriptionFlowDataType> = {
  id: PREFERENCE_NODE,
  component: undefined,
  resolver: zodResolver(PreferenceSchema),
  riveState: (data: SubscriptionFlowDataType) => 'idle',
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: SubscriptionFlowDataType) => (data.preference === 'flower' ? SIZE_NODE : VASE_NODE),
  inputType: 'buttonSelect',
  answers: PreferenceEnum
};

const sizeNode: FlowNode<SizeType, SubscriptionFlowDataType> = {
  id: SIZE_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => {
    switch (data?.preference) {
      case 'flower':
        return 'flower';
      case 'plant':
        return 'plant';
      default:
        return 'flower';
    }
  },
  resolver: zodResolver(SizeSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) =>
    flowData.path === 'other' ? NOTES_NODE : COLOR_NODE,
  inputType: 'buttonSelect',
  answers: SizeEnum
};

const colorNode: FlowNode<ColorType, SubscriptionFlowDataType> = {
  id: COLOR_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => {
    switch (data?.size) {
      case 'small':
        return 'flowerSmall';
      case 'medium':
        return 'flowerMedium';
      case 'large':
        return 'flowerLarge';
      default:
        return 'grande';
    }
  },
  resolver: zodResolver(ColorSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => PACKAGING_NODE,
  inputType: 'buttonSelect',
  answers: ColorEnum
};

const packagingNode: FlowNode<PackagingType, SubscriptionFlowDataType> = {
  id: PACKAGING_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'packaging',
  resolver: zodResolver(PackagingSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => FREQUENCY_NODE,
  inputType: 'buttonSelect',
  answers: PackagingEnum
};

const frequencyNode: FlowNode<FrequencyType, SubscriptionFlowDataType> = {
  id: FREQUENCY_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'calendar',
  resolver: zodResolver(FrequencySchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => DAY_NODE,
  inputType: 'buttonSelect',
  answers: FrequencyEnum
};

const dayNode: FlowNode<DayType, SubscriptionFlowDataType> = {
  id: DAY_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'calendar',
  resolver: zodResolver(DaySchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: DayType) => 'end', // TODO: change to end
  inputType: 'buttonMultiSelect',
  answers: DayEnum
};

const vaseNode: FlowNode<VaseType, SubscriptionFlowDataType> = {
  id: VASE_NODE,
  component: undefined,
  resolver: zodResolver(VaseSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: SubscriptionFlowDataType) => SURPRISE_NODE,
  inputType: 'buttonSelect',
  answers: VaseEnum
};

const surpriseNode: FlowNode<SurpriseType, SubscriptionFlowDataType> = {
  id: SURPRISE_NODE,
  component: undefined,
  resolver: zodResolver(SurpriseSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: SubscriptionFlowDataType) => NOTES_NODE,
  inputType: 'buttonSelect',
  answers: SurpriseEnum
};

const forNode: FlowNode<ForType, SubscriptionFlowDataType> = {
  id: FOR_WHOM_NODE,
  component: undefined,
  resolver: zodResolver(ForSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => ANNIVERSARIES_NODE,
  inputType: 'buttonSelect',
  answers: ForEnum
};

const anniversariesNode: FlowNode<AnniversaryType, SubscriptionFlowDataType> = {
  id: ANNIVERSARIES_NODE,
  component: undefined,
  resolver: zodResolver(AnniversarySchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => {
    flowData.specificDay = getSpecificDayByAnniversary(flowData.anniversaries) as Date;

    return flowData.anniversaries === 'other' || flowData.anniversaries === 'birthday'
      ? SPECIFIC_DAY_NODE
      : SIZE_NODE;
  },
  inputType: 'buttonSelect',
  answers: AnniversaryEnum
};

const specificDayNode: FlowNode<SpecificDayType, SubscriptionFlowDataType> = {
  id: SPECIFIC_DAY_NODE,
  component: undefined,
  resolver: zodResolver(SpecificDaySchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => SIZE_NODE,
  inputType: 'date'
};

const notesNode: FlowNode<NotesType, SubscriptionFlowDataType> = {
  id: NOTES_NODE,
  component: undefined,
  resolver: zodResolver(NotesSchema),
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => 'end', // TODO: change to end
  inputType: 'text'
};

export const questionsFlow: Flow = {
  translations: 'flows.subscriptionFlow',
  startingNodeId: PATH_NODE,
  steps: {
    [PATH_NODE]: PathNode,
    [PREFERENCE_NODE]: preferenceNode,
    [SIZE_NODE]: sizeNode,
    [COLOR_NODE]: colorNode,
    [PACKAGING_NODE]: packagingNode,
    [FREQUENCY_NODE]: frequencyNode,
    [DAY_NODE]: dayNode,
    [VASE_NODE]: vaseNode,
    [SURPRISE_NODE]: surpriseNode,
    [FOR_WHOM_NODE]: forNode,
    [ANNIVERSARIES_NODE]: anniversariesNode,
    [SPECIFIC_DAY_NODE]: specificDayNode,
    [NOTES_NODE]: notesNode
  }
};
