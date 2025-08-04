'use server';

import { CoordinatesType } from '@/__types/geocoding';

export const getCoordinates = async (address: CoordinatesType): Promise<CoordinatesType> => ({
  ...address
});
