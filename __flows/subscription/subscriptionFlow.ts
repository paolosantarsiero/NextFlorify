import { zodResolver } from '@hookform/resolvers/zod';
import { Flow } from '__flows/_flow';
import { FlowNode } from '__flows/_flowNode';
import {
  CaspoSchema,
  CaspoType,
  ColorEnum,
  ColorSchema,
  ColorType,
  DayEnum,
  DaySchema,
  DayType,
  ForWhomEnum,
  ForWhomSchema,
  ForWhomType,
  FrequencyEnum,
  FrequencySchema,
  FrequencyType,
  LengthEnum,
  LengthSchema,
  LengthType,
  NotesSchema,
  NotesType,
  OccasionEnum,
  OccasionSchema,
  OccasionType,
  PackagingEnum,
  PackagingSchema,
  PackagingType,
  PathEnum,
  PathSchema,
  PathType,
  PreferenceEnum,
  PreferenceSchema,
  PreferenceType,
  SpecificDaySchema,
  SpecificDayType,
  SubscriptionFlowDataType,
  SurpriseSchema,
  SurpriseType
} from '__flows/subscription/subscriptionQuestionsSchema';

export const PATH_NODE = 'path';
export const PREFERENCE_NODE = 'preference';
export const LENGTH_NODE = 'length';
export const COLOR_NODE = 'color';
export const PACKAGING_NODE = 'packaging';
export const FREQUENCY_NODE = 'frequency';
export const DAY_NODE = 'day';
export const CASPO_NODE = 'caspo';
export const SURPRISE_NODE = 'surprise';
export const FOR_WHOM_NODE = 'forWhom';
export const OCCASION_NODE = 'occasion';
export const SPECIFIC_DAY_NODE = 'specificDay';
export const NOTES_NODE = 'notes';

const PathNode: FlowNode<PathType, SubscriptionFlowDataType> = {
  id: PATH_NODE,
  component: undefined,
  resolver: zodResolver(PathSchema),
  riveState: (data: SubscriptionFlowDataType) => {
    return 'waiting';
  },
  next: (data: PathType) => (data.path === 'myself' ? PREFERENCE_NODE : FOR_WHOM_NODE),
  inputType: 'buttonSelect',
  answers: PathEnum
};

const preferenceNode: FlowNode<PreferenceType, SubscriptionFlowDataType> = {
  id: PREFERENCE_NODE,
  component: undefined,
  resolver: zodResolver(PreferenceSchema),
  riveState: (data: SubscriptionFlowDataType) => 'idle',
  next: (data: PreferenceType) => (data.preference === 'flower' ? LENGTH_NODE : CASPO_NODE),
  inputType: 'buttonSelect',
  answers: PreferenceEnum
};

const lengthNode: FlowNode<LengthType, SubscriptionFlowDataType> = {
  id: LENGTH_NODE,
  component: undefined,
  resolver: zodResolver(LengthSchema),
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
  next: (data: LengthType) => COLOR_NODE,
  inputType: 'buttonSelect',
  answers: LengthEnum
};

const colorNode: FlowNode<ColorType, SubscriptionFlowDataType> = {
  id: COLOR_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => {
    switch (data?.length) {
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
  next: (data: ColorType) => PACKAGING_NODE,
  inputType: 'buttonSelect',
  answers: ColorEnum
};

const packagingNode: FlowNode<PackagingType, SubscriptionFlowDataType> = {
  id: PACKAGING_NODE,
  component: undefined,
  riveState: (data: SubscriptionFlowDataType) => 'calendar',
  resolver: zodResolver(PackagingSchema),
  next: (data: PackagingType) => FREQUENCY_NODE,
  inputType: 'buttonSelect',
  answers: PackagingEnum
};

const frequencyNode: FlowNode<FrequencyType, SubscriptionFlowDataType> = {
  id: FREQUENCY_NODE,
  component: undefined,
  resolver: zodResolver(FrequencySchema),
  next: (data: FrequencyType) => DAY_NODE,
  inputType: 'buttonSelect',
  answers: FrequencyEnum
};

const dayNode: FlowNode<DayType, SubscriptionFlowDataType> = {
  id: 'day',
  component: undefined,
  resolver: zodResolver(DaySchema),
  next: (data: DayType) => 'end', // TODO: change to end
  inputType: 'buttonSelect',
  answers: DayEnum
};

const caspoNode: FlowNode<CaspoType, SubscriptionFlowDataType> = {
  id: CASPO_NODE,
  component: undefined,
  resolver: zodResolver(CaspoSchema),
  next: (data: CaspoType) => SURPRISE_NODE,
  inputType: 'boolean'
};

const surpriseNode: FlowNode<SurpriseType, SubscriptionFlowDataType> = {
  id: SURPRISE_NODE,
  component: undefined,
  resolver: zodResolver(SurpriseSchema),
  next: (data: SurpriseType) => NOTES_NODE,
  inputType: 'boolean'
};

const forWhomNode: FlowNode<ForWhomType, SubscriptionFlowDataType> = {
  id: FOR_WHOM_NODE,
  component: undefined,
  resolver: zodResolver(ForWhomSchema),
  next: (data: ForWhomType) => OCCASION_NODE,
  inputType: 'buttonSelect',
  answers: ForWhomEnum
};

const occasionNode: FlowNode<OccasionType, SubscriptionFlowDataType> = {
  id: OCCASION_NODE,
  component: undefined,
  resolver: zodResolver(OccasionSchema),
  next: (data: OccasionType) =>
    data.occasion === 'other' || data.occasion === 'birthday' ? SPECIFIC_DAY_NODE : NOTES_NODE,
  inputType: 'buttonSelect',
  answers: OccasionEnum
};

const specificDayNode: FlowNode<SpecificDayType, SubscriptionFlowDataType> = {
  id: SPECIFIC_DAY_NODE,
  component: undefined,
  resolver: zodResolver(SpecificDaySchema),
  next: (data: SpecificDayType) => NOTES_NODE,
  inputType: 'date'
};

const notesNode: FlowNode<NotesType, SubscriptionFlowDataType> = {
  id: NOTES_NODE,
  component: undefined,
  resolver: zodResolver(NotesSchema),
  next: (data: NotesType) => 'end', // TODO: change to end
  inputType: 'text'
};

export const questionsFlow: Flow = {
  translations: 'flows.subscriptionFlow',
  startingNodeId: PATH_NODE,
  steps: {
    [PATH_NODE]: PathNode,
    [PREFERENCE_NODE]: preferenceNode,
    [LENGTH_NODE]: lengthNode,
    [COLOR_NODE]: colorNode,
    [PACKAGING_NODE]: packagingNode,
    [FREQUENCY_NODE]: frequencyNode,
    [DAY_NODE]: dayNode,
    [CASPO_NODE]: caspoNode,
    [SURPRISE_NODE]: surpriseNode,
    [FOR_WHOM_NODE]: forWhomNode,
    [OCCASION_NODE]: occasionNode,
    [SPECIFIC_DAY_NODE]: specificDayNode,
    [NOTES_NODE]: notesNode
  }
};
