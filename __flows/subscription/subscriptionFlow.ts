import { FLOWER_ANIMATION_NAME, FlowerAnimationStates } from '@/__types/animations/flower';
import { CoordinatesSchema, CoordinatesType } from '@/__types/geocoding';
import { formatDateToDDMMYYYY, getAnniversayDateByAnniversary } from '@/lib/utils';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import {
  AnniversaryDateSchema,
  AnniversaryDateType,
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
  PerfumeEnum,
  PerfumeSchema,
  PerfumeType,
  PreferenceEnum,
  PreferenceSchema,
  PreferenceType,
  SizeEnum,
  SizeSchema,
  SizeType,
  StyleEnum,
  StyleSchema,
  StyleType,
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
export const COLOR_NODE = 'primary_color';
export const PACKAGING_NODE = 'packaging';
export const FREQUENCY_NODE = 'frequency';
export const DAY_NODE = 'selected_days';
export const VASE_NODE = 'vase';
export const SURPRISE_NODE = 'surprise';
export const FOR_WHOM_NODE = 'for';
export const ANNIVERSARIES_NODE = 'anniversaries';
export const STYLE_NODE = 'style';
export const PERFUME_NODE = 'perfume';
export const ANNIVERSARY_DATE_NODE = 'anniversary_date';
export const NOTES_NODE = 'notes';
export const COORDINATES_NODE = 'coordinates';

const PathNode: FlowNode<PathType, SubscriptionFlowDataType> = {
  id: PATH_NODE,
  component: undefined,
  schema: PathSchema,
  riveState: (data: SubscriptionFlowDataType) => 'watching',
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
  schema: PreferenceSchema,
  riveState: (data: SubscriptionFlowDataType) => 'idle',
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: SubscriptionFlowDataType) => (data.preference === 'flower' ? SIZE_NODE : VASE_NODE),
  inputType: 'buttonSelect',
  answers: PreferenceEnum
};

const sizeNode: FlowNode<SizeType, SubscriptionFlowDataType> = {
  id: SIZE_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'flower',
  schema: SizeSchema,
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
        return 'flowerLarge';
    }
  },
  schema: ColorSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) =>
    flowData.path === 'other' ? STYLE_NODE : PACKAGING_NODE,
  inputType: 'buttonMultiSelect',
  answers: ColorEnum
};

const packagingNode: FlowNode<PackagingType, SubscriptionFlowDataType> = {
  id: PACKAGING_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'packaging',
  schema: PackagingSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => FREQUENCY_NODE,
  inputType: 'buttonSelect',
  answers: PackagingEnum
};

const frequencyNode: FlowNode<FrequencyType, SubscriptionFlowDataType> = {
  id: FREQUENCY_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'calendar',
  schema: FrequencySchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => DAY_NODE,
  inputType: 'buttonSelect',
  answers: FrequencyEnum
};

const dayNode: FlowNode<DayType, SubscriptionFlowDataType> = {
  id: DAY_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'calendar',
  schema: DaySchema,
  cssAnimations: [
    { component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING_INFINITE }
  ],
  next: (flowData: SubscriptionFlowDataType) =>
    flowData.preference === 'plant' ? NOTES_NODE : 'end',
  inputType: 'buttonMultiSelect',
  answers: DayEnum
};

const vaseNode: FlowNode<VaseType, SubscriptionFlowDataType> = {
  id: VASE_NODE,
  component: undefined,
  schema: VaseSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: SubscriptionFlowDataType) => SURPRISE_NODE,
  inputType: 'buttonSelect',
  answers: VaseEnum
};

const surpriseNode: FlowNode<SurpriseType, SubscriptionFlowDataType> = {
  id: SURPRISE_NODE,
  component: undefined,
  schema: SurpriseSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (data: SubscriptionFlowDataType) => DAY_NODE,
  inputType: 'buttonSelect',
  answers: SurpriseEnum
};

const forNode: FlowNode<ForType, SubscriptionFlowDataType> = {
  id: FOR_WHOM_NODE,
  component: undefined,
  schema: ForSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => ANNIVERSARIES_NODE,
  inputType: 'buttonSelect',
  answers: ForEnum
};

const anniversariesNode: FlowNode<AnniversaryType, SubscriptionFlowDataType> = {
  id: ANNIVERSARIES_NODE,
  component: undefined,
  schema: AnniversarySchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => {
    flowData.anniversary_date = formatDateToDDMMYYYY(
      getAnniversayDateByAnniversary(flowData.anniversaries)
    );

    return ['other', 'birthday', 'anniversary'].includes(flowData.anniversaries)
      ? ANNIVERSARY_DATE_NODE
      : COLOR_NODE;
  },
  inputType: 'buttonSelect',
  answers: AnniversaryEnum
};

const styleNode: FlowNode<StyleType, SubscriptionFlowDataType> = {
  id: STYLE_NODE,
  component: undefined,
  schema: StyleSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => PERFUME_NODE,
  inputType: 'buttonMultiSelect',
  answers: StyleEnum
};

const perfumeNode: FlowNode<PerfumeType, SubscriptionFlowDataType> = {
  id: PERFUME_NODE,
  component: undefined,
  schema: PerfumeSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => SIZE_NODE,
  inputType: 'buttonMultiSelect',
  answers: PerfumeEnum
};

const anniversaryDate: FlowNode<AnniversaryDateType, SubscriptionFlowDataType> = {
  id: ANNIVERSARY_DATE_NODE,
  component: undefined,
  schema: AnniversaryDateSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => COLOR_NODE,
  inputType: 'date'
};

const notesNode: FlowNode<NotesType, SubscriptionFlowDataType> = {
  id: NOTES_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'watching',
  schema: NotesSchema,
  cssAnimations: [{ component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING }],
  next: (flowData: SubscriptionFlowDataType) => COORDINATES_NODE,
  inputType: 'text'
};

const coordinatesNode: FlowNode<CoordinatesType, SubscriptionFlowDataType> = {
  id: COORDINATES_NODE,
  component: undefined,
  schema: CoordinatesSchema,
  cssAnimations: [
    { component: FLOWER_ANIMATION_NAME, state: FlowerAnimationStates.LOADING_INFINITE }
  ],
  next: (flowData: SubscriptionFlowDataType) => 'end', // TODO: change to end
  inputType: 'coordinates'
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
    [STYLE_NODE]: styleNode,
    [PERFUME_NODE]: perfumeNode,
    [ANNIVERSARY_DATE_NODE]: anniversaryDate,
    [NOTES_NODE]: notesNode,
    [COORDINATES_NODE]: coordinatesNode
  }
};
