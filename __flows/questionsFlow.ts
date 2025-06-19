import { zodResolver } from '@hookform/resolvers/zod';
import {
  CaspoSchema,
  CaspoType,
  ColorSchema,
  ColorType,
  DaySchema,
  DayType,
  ForMeSchema,
  ForMeType,
  ForWhomSchema,
  ForWhomType,
  FrequencySchema,
  FrequencyType,
  LengthSchema,
  LengthType,
  NotesSchema,
  NotesType,
  OccasionSchema,
  OccasionType,
  PackagingSchema,
  PackagingType,
  PreferenceSchema,
  PreferenceType,
  SpecificDaySchema,
  SpecificDayType,
  SurpriseSchema,
  SurpriseType
} from '__types/questions/questions';
import { FieldValues, Resolver } from 'react-hook-form';

export type InputType = 'text' | 'buttonSelect' | 'date';

export type FlowNode<T extends FieldValues> = {
  id: string;
  component?: React.FC;
  resolver: Resolver<T>;
  next: (data: T) => string | null;
  inputType: InputType;
};

export const FOR_ME_NODE = 'forMe';
const forMeNode: FlowNode<ForMeType> = {
  id: FOR_ME_NODE,
  component: undefined,
  resolver: zodResolver(ForMeSchema),
  next: (data: ForMeType) => (data.forMe === 'myself' ? 'preference' : 'forWhom'),
  inputType: 'buttonSelect'
};

export const PREFERENCE_NODE = 'preference';
const preferenceNode: FlowNode<PreferenceType> = {
  id: PREFERENCE_NODE,
  component: undefined,
  resolver: zodResolver(PreferenceSchema),
  next: (data: PreferenceType) => (data.preference === 'flower' ? 'length' : 'caspo'),
  inputType: 'buttonSelect'
};

export const LENGTH_NODE = 'length';
const lengthNode: FlowNode<LengthType> = {
  id: LENGTH_NODE,
  component: undefined,
  resolver: zodResolver(LengthSchema),
  next: (data: LengthType) => 'color',
  inputType: 'buttonSelect'
};

export const COLOR_NODE = 'color';
const colorNode: FlowNode<ColorType> = {
  id: COLOR_NODE,
  component: undefined,
  resolver: zodResolver(ColorSchema),
  next: (data: ColorType) => 'packaging',
  inputType: 'buttonSelect'
};

export const PACKAGING_NODE = 'packaging';
const packagingNode: FlowNode<PackagingType> = {
  id: PACKAGING_NODE,
  component: undefined,
  resolver: zodResolver(PackagingSchema),
  next: (data: PackagingType) => 'frequency',
  inputType: 'buttonSelect'
};

export const FREQUENCY_NODE = 'frequency';
const frequencyNode: FlowNode<FrequencyType> = {
  id: FREQUENCY_NODE,
  component: undefined,
  resolver: zodResolver(FrequencySchema),
  next: (data: FrequencyType) => 'day',
  inputType: 'buttonSelect'
};

export const DAY_NODE = 'day';
const dayNode: FlowNode<DayType> = {
  id: 'day',
  component: undefined,
  resolver: zodResolver(DaySchema),
  next: (data: DayType) => 'end',
  inputType: 'buttonSelect'
};

export const CASPO_NODE = 'caspo';
const caspoNode: FlowNode<CaspoType> = {
  id: CASPO_NODE,
  component: undefined,
  resolver: zodResolver(CaspoSchema),
  next: (data: CaspoType) => 'surprise',
  inputType: 'buttonSelect'
};

export const SURPRISE_NODE = 'surprise';
const surpriseNode: FlowNode<SurpriseType> = {
  id: SURPRISE_NODE,
  component: undefined,
  resolver: zodResolver(SurpriseSchema),
  next: (data: SurpriseType) => 'notes',
  inputType: 'buttonSelect'
};

export const FOR_WHOM_NODE = 'forWhom';
const forWhomNode: FlowNode<ForWhomType> = {
  id: FOR_WHOM_NODE,
  component: undefined,
  resolver: zodResolver(ForWhomSchema),
  next: (data: ForWhomType) => 'end',
  inputType: 'buttonSelect'
};

export const OCCASION_NODE = 'occasion';
const occasionNode: FlowNode<OccasionType> = {
  id: OCCASION_NODE,
  component: undefined,
  resolver: zodResolver(OccasionSchema),
  next: (data: OccasionType) =>
    data.occasion === 'other' || data.occasion === 'birthday' ? 'specificDay' : 'end',
  inputType: 'buttonSelect'
};

export const SPECIFIC_DAY_NODE = 'specificDay';
const specificDayNode: FlowNode<SpecificDayType> = {
  id: SPECIFIC_DAY_NODE,
  component: undefined,
  resolver: zodResolver(SpecificDaySchema),
  next: (data: SpecificDayType) => 'end',
  inputType: 'date'
};

export const NOTES_NODE = 'notes';
const notesNode: FlowNode<NotesType> = {
  id: NOTES_NODE,
  component: undefined,
  resolver: zodResolver(NotesSchema),
  next: (data: NotesType) => 'end',
  inputType: 'text'
};

export const questionsFlow = {
  forMe: forMeNode,
  preference: preferenceNode,
  length: lengthNode,
  color: colorNode,
  packaging: packagingNode,
  frequency: frequencyNode,
  day: dayNode,
  caspo: caspoNode,
  surprise: surpriseNode,
  forWhom: forWhomNode,
  occasion: occasionNode,
  specificDay: specificDayNode,
  notes: notesNode
};
