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
  ForMeEnum,
  ForMeSchema,
  ForMeType,
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
  PreferenceEnum,
  PreferenceSchema,
  PreferenceType,
  SpecificDaySchema,
  SpecificDayType,
  SurpriseSchema,
  SurpriseType
} from '__flows/subscription/subscriptionQuestionsSchema';

export const FOR_ME_NODE = 'forMe';
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

const forMeNode: FlowNode<ForMeType> = {
  id: FOR_ME_NODE,
  component: undefined,
  resolver: zodResolver(ForMeSchema),
  next: (data: ForMeType) => (data.forMe === 'myself' ? PREFERENCE_NODE : FOR_WHOM_NODE),
  inputType: 'buttonSelect',
  answers: ForMeEnum
};

const preferenceNode: FlowNode<PreferenceType> = {
  id: PREFERENCE_NODE,
  component: undefined,
  resolver: zodResolver(PreferenceSchema),
  next: (data: PreferenceType) => (data.preference === 'flower' ? LENGTH_NODE : CASPO_NODE),
  inputType: 'buttonSelect',
  answers: PreferenceEnum
};

const lengthNode: FlowNode<LengthType> = {
  id: LENGTH_NODE,
  component: undefined,
  resolver: zodResolver(LengthSchema),
  next: (data: LengthType) => COLOR_NODE,
  inputType: 'buttonSelect',
  answers: LengthEnum
};

const colorNode: FlowNode<ColorType> = {
  id: COLOR_NODE,
  component: undefined,
  resolver: zodResolver(ColorSchema),
  next: (data: ColorType) => PACKAGING_NODE,
  inputType: 'buttonSelect',
  answers: ColorEnum
};

const packagingNode: FlowNode<PackagingType> = {
  id: PACKAGING_NODE,
  component: undefined,
  resolver: zodResolver(PackagingSchema),
  next: (data: PackagingType) => FREQUENCY_NODE,
  inputType: 'buttonSelect',
  answers: PackagingEnum
};

const frequencyNode: FlowNode<FrequencyType> = {
  id: FREQUENCY_NODE,
  component: undefined,
  resolver: zodResolver(FrequencySchema),
  next: (data: FrequencyType) => DAY_NODE,
  inputType: 'buttonSelect',
  answers: FrequencyEnum
};

const dayNode: FlowNode<DayType> = {
  id: 'day',
  component: undefined,
  resolver: zodResolver(DaySchema),
  next: (data: DayType) => 'end', // TODO: change to end
  inputType: 'buttonSelect',
  answers: DayEnum
};

const caspoNode: FlowNode<CaspoType> = {
  id: CASPO_NODE,
  component: undefined,
  resolver: zodResolver(CaspoSchema),
  next: (data: CaspoType) => SURPRISE_NODE,
  inputType: 'boolean'
};

const surpriseNode: FlowNode<SurpriseType> = {
  id: SURPRISE_NODE,
  component: undefined,
  resolver: zodResolver(SurpriseSchema),
  next: (data: SurpriseType) => NOTES_NODE,
  inputType: 'boolean'
};

const forWhomNode: FlowNode<ForWhomType> = {
  id: FOR_WHOM_NODE,
  component: undefined,
  resolver: zodResolver(ForWhomSchema),
  next: (data: ForWhomType) => OCCASION_NODE,
  inputType: 'buttonSelect',
  answers: ForWhomEnum
};

const occasionNode: FlowNode<OccasionType> = {
  id: OCCASION_NODE,
  component: undefined,
  resolver: zodResolver(OccasionSchema),
  next: (data: OccasionType) =>
    data.occasion === 'other' || data.occasion === 'birthday' ? SPECIFIC_DAY_NODE : NOTES_NODE,
  inputType: 'buttonSelect',
  answers: OccasionEnum
};

const specificDayNode: FlowNode<SpecificDayType> = {
  id: SPECIFIC_DAY_NODE,
  component: undefined,
  resolver: zodResolver(SpecificDaySchema),
  next: (data: SpecificDayType) => NOTES_NODE,
  inputType: 'date'
};

const notesNode: FlowNode<NotesType> = {
  id: NOTES_NODE,
  component: undefined,
  resolver: zodResolver(NotesSchema),
  next: (data: NotesType) => 'end', // TODO: change to end
  inputType: 'text'
};

export const questionsFlow: Flow = {
  translations: 'flows.subscriptionFlow',
  steps: {
    [FOR_ME_NODE]: forMeNode,
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
