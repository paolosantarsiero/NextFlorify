import { zodResolver } from '@hookform/resolvers/zod';
import {
  caspoSchema,
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
  PreferenceType
} from '__types/questions/questions';
import { FieldValues, Resolver } from 'react-hook-form';

export type FlowNode<T extends FieldValues> = {
  id: string;
  component?: React.FC;
  resolver: Resolver<T>;
  next: (data: T) => string | null;
};

const forMeNode: FlowNode<ForMeType> = {
  id: 'forMe',
  component: undefined,
  resolver: zodResolver(ForMeSchema),
  next: (data: ForMeType) => (data.forMe === 'myself' ? 'preference' : 'forWhom')
};

const preferenceNode: FlowNode<PreferenceType> = {
  id: 'preference',
  component: undefined,
  resolver: zodResolver(PreferenceSchema),
  next: (data: PreferenceType) => (data.preference === 'flower' ? 'length' : 'caspo')
};

const lengthNode: FlowNode<LengthType> = {
  id: 'length',
  component: undefined,
  resolver: zodResolver(LengthSchema),
  next: (data: LengthType) => 'color'
};

const colorNode: FlowNode<ColorType> = {
  id: 'color',
  component: undefined,
  resolver: zodResolver(ColorSchema),
  next: (data: ColorType) => 'packaging'
};

const packagingNode: FlowNode<PackagingType> = {
  id: 'packaging',
  component: undefined,
  resolver: zodResolver(PackagingSchema),
  next: (data: PackagingType) => 'frequency'
};

const frequencyNode: FlowNode<FrequencyType> = {
  id: 'frequency',
  component: undefined,
  resolver: zodResolver(FrequencySchema),
  next: (data: FrequencyType) => 'day'
};

const dayNode: FlowNode<DayType> = {
  id: 'day',
  component: undefined,
  resolver: zodResolver(DaySchema),
  next: (data: DayType) => 'end'
};

const caspoNode: FlowNode<CaspoType> = {
  id: 'caspo',
  component: undefined,
  resolver: zodResolver(caspoSchema),
  next: (data: CaspoType) => 'surprise'
};

const forWhomNode: FlowNode<ForWhomType> = {
  id: 'forWhom',
  component: undefined,
  resolver: zodResolver(ForWhomSchema),
  next: (data: ForWhomType) => 'end'
};

const occasionNode: FlowNode<OccasionType> = {
  id: 'occasion',
  component: undefined,
  resolver: zodResolver(OccasionSchema),
  next: (data: OccasionType) => 'end'
};

const notesNode: FlowNode<NotesType> = {
  id: 'notes',
  component: undefined,
  resolver: zodResolver(NotesSchema),
  next: (data: NotesType) => 'end'
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
  forWhom: forWhomNode,
  occasion: occasionNode,
  notes: notesNode
};
