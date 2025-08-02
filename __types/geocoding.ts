import { z } from 'zod';

export const getCoordinatesSchema = z.object({
  houseNumber: z.string().min(1, { message: '!' }),
  street: z.string().min(1, { message: '!' }),
  city: z.string(),
  country: z.string(),
  postcode: z.string().min(1, { message: '!' })
});

export type GetCoordinatesType = z.infer<typeof getCoordinatesSchema>;

export const coordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});

export type CoordinatesType = z.infer<typeof coordinatesSchema>;
