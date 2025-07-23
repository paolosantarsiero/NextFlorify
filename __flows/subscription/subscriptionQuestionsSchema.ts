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

export const ColorEnum = z.enum([
  'blue',
  'green',
  'orange',
  'pink',
  'red',
  'violet',
  'white',
  'yellow',
  'any'
]);
export const ColorSchema = z.object({
  primary_color: z.array(ColorEnum).nonempty(),
});
export type ColorType = z.infer<typeof ColorSchema>;

export const PackagingEnum = z.enum(['natural', 'foliage', 'no-foliage', 'any']);
export const PackagingSchema = z.object({
  packaging: PackagingEnum
});
export type PackagingType = z.infer<typeof PackagingSchema>;

export const FrequencyEnum = z.enum(['weekly', 'biweekly', 'monthly']);
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

export const SurpriseEnum = z.enum(['yes', 'no']);
export const SurpriseSchema = z.object({
  surprise: SurpriseEnum
});
export type SurpriseType = z.infer<typeof SurpriseSchema>;

//forOthers

export const ForEnum = z.enum(['her', 'him', 'friends', 'family', 'colleagues', 'customers']);
export const ForSchema = z.object({
  for: ForEnum
});
export type ForType = z.infer<typeof ForSchema>;

export const AnniversaryEnum = z.enum([
  'birthday',
  'anniversary',
  'mothers-day',
  'fathers-day',
  'womens-day',
  'christmas',
  'easter',
  'saint-valentine',
  'other'
]);
export const AnniversarySchema = z.object({
  anniversaries: AnniversaryEnum
});
export type AnniversaryType = z.infer<typeof AnniversarySchema>;

export const StyleEnum = z.enum([
  'autumnal',
  'carefree',
  'classic',
  'elegant',
  'hot',
  'joyful',
  'light',
  'lively',
  'minimalist',
  'modern',
  'natural',
  'rich',
  'romantic',
  'rustic',
  'simple',
  'solar',
  'spring',
  'sunny',
  'traditional'
]);
export const StyleSchema = z.object({
  style: z.array(StyleEnum).nonempty()
});
export type StyleType = z.infer<typeof StyleSchema>;

export const PerfumeEnum = z.enum([
  'balsamic',
  'delicate',
  'flowery',
  'fresh',
  'light',
  'mixed',
  'spicy',
  'sweet'
]);
export const PerfumeSchema = z.object({
  perfume: z.array(PerfumeEnum).nonempty()
});
export type PerfumeType = z.infer<typeof PerfumeSchema>;

export const NotesSchema = z.object({
  notes: z.string().optional()
});
export type NotesType = z.infer<typeof NotesSchema>;

// specific day

export const AnniversayDateSchema = z.object({
  anniversary_date: z
    .string()
    .nullish()
    .refine(
      (val) => {
        if (!val) return true; // Allow null or undefined values
        const date = new Date(val);
        const now = new Date();
        // Confronta solo la data, non l'orario
        date.setHours(0, 0, 0, 0);
        now.setHours(0, 0, 0, 0);
        return date >= now;
      },
      { message: 'Date cannot be in the past' }
    )
});
export type AnniversayDateType = z.infer<typeof AnniversayDateSchema>;

export type SubscriptionFlowDataType = PathType &
  PreferenceType &
  SizeType &
  ColorType &
  PackagingType &
  FrequencyType &
  DayType &
  VaseType &
  SurpriseType &
  ForType &
  AnniversaryType &
  StyleType &
  PerfumeType &
  AnniversayDateType &
  NotesType;
