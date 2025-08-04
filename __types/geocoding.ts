import { z } from 'zod';

export const CoordinatesSchema = z.object({
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  })
});

export type CoordinatesType = z.infer<typeof CoordinatesSchema>;
