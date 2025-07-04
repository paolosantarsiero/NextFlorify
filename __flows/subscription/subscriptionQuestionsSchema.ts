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

export const SizeEnum = z.enum(['small', 'medium', 'large']);
export const SizeSchema = z.object({
  size: SizeEnum
});
export type SizeType = z.infer<typeof SizeSchema>;

export const ColorEnum = z.enum(['red', 'white', 'diy']);
export const ColorSchema = z.object({
  color: ColorEnum
});
export type ColorType = z.infer<typeof ColorSchema>;

export const PackagingEnum = z.enum(['natural', 'foliage', 'no-foliage', 'any']);
export const PackagingSchema = z.object({
  packaging: PackagingEnum
});
export type PackagingType = z.infer<typeof PackagingSchema>;

export const FrequencyEnum = z.enum(['weekly', 'bi-weekly', 'monthly']);
export const FrequencySchema = z.object({
  frequency: FrequencyEnum
});
export type FrequencyType = z.infer<typeof FrequencySchema>;

export const DayEnum = z.enum(['0', '1', '2', '3', '4', '5', '6']);
export const DaySchema = z.object({
  selected_days: z.array(DayEnum)
});
export type DayType = z.infer<typeof DaySchema>;

//Plants

export const VaseEnum = z.enum(['yes', 'no']);
export const VaseSchema = z.object({
  vase: VaseEnum
});
export type VaseType = z.infer<typeof VaseSchema>;

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
  SizeType &
  ColorType &
  PackagingType &
  FrequencyType &
  DayType &
  VaseType &
  SurpriseType &
  ForWhomType &
  OccasionType &
  SpecificDayType &
  NotesType;
