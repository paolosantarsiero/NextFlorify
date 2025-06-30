import { z } from 'zod';

// For me/others

export const PathEnum = z.enum(['myself', 'other']);
export const PathSchema = z.object({
  path: PathEnum
});
export type PathType = z.infer<typeof PathSchema>;

// Preference

export const PreferenceEnum = z.enum(['flower', 'plant']);
export const PreferenceSchema = z.object({
  preference: PreferenceEnum
});
export type PreferenceType = z.infer<typeof PreferenceSchema>;

// Flowers

export const LengthEnum = z.enum(['small', 'medium', 'large']);
export const LengthSchema = z.object({
  length: LengthEnum
});
export type LengthType = z.infer<typeof LengthSchema>;

export const ColorEnum = z.enum(['red', 'white', 'diy']);
export const ColorSchema = z.object({
  color: ColorEnum
});
export type ColorType = z.infer<typeof ColorSchema>;

export const PackagingEnum = z.enum(['natural', 'withoutLeaves', 'withLeaves', 'diy']);
export const PackagingSchema = z.object({
  packaging: PackagingEnum
});
export type PackagingType = z.infer<typeof PackagingSchema>;

export const FrequencyEnum = z.enum(['weekly', 'bi-weekly', 'monthly', 'yearly']);
export const FrequencySchema = z.object({
  frequency: FrequencyEnum
});
export type FrequencyType = z.infer<typeof FrequencySchema>;

export const DayEnum = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]);
export const DaySchema = z.object({
  day: DayEnum
});
export type DayType = z.infer<typeof DaySchema>;

//Plants

export const CaspoSchema = z.object({
  caspo: z.boolean()
});
export type CaspoType = z.infer<typeof CaspoSchema>;

export const SurpriseSchema = z.object({
  surprise: z.boolean()
});
export type SurpriseType = z.infer<typeof SurpriseSchema>;

//forOthers

export const ForWhomEnum = z.enum([
  'spouse',
  'parent',
  'grandparent',
  'friend',
  'partner',
  'special',
  'other'
]);
export const ForWhomSchema = z.object({
  forWhom: ForWhomEnum
});
export type ForWhomType = z.infer<typeof ForWhomSchema>;

export const OccasionEnum = z.enum([
  'birthday',
  'anniversary',
  'mothersDay',
  'fathersDay',
  'womenDay',
  'christmas',
  'easter',
  'valentinesDay',
  'other'
]);
export const OccasionSchema = z.object({
  occasion: OccasionEnum
});
export type OccasionType = z.infer<typeof OccasionSchema>;

export const NotesSchema = z.object({
  notes: z.string().optional()
});
export type NotesType = z.infer<typeof NotesSchema>;

// specific day

export const SpecificDaySchema = z.object({
  specificDay: z.date()
});
export type SpecificDayType = z.infer<typeof SpecificDaySchema>;

export type SubscriptionFlowDataType = PathType &
  PreferenceType &
  LengthType &
  ColorType &
  PackagingType &
  FrequencyType &
  DayType &
  CaspoType &
  SurpriseType &
  ForWhomType &
  OccasionType &
  SpecificDayType &
  NotesType;
