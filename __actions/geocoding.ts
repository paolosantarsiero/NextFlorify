'use server';

import { AddressSchemaType } from '@/__flows/subscription/subscriptionQuestionsSchema';
import { GetCoordinatesType } from '@/__types/geocoding';

export const getCoordinates = async (address: GetCoordinatesType): Promise<AddressSchemaType> => {
  const params = new URLSearchParams({
    housenumber: address.houseNumber,
    street: address.street,
    city: address.city,
    country: address.country,
    postcode: address.postcode,
    apiKey: process.env.GEOAPIFY_API_KEY || ''
  });
  const response = await fetch(`https://api.geoapify.com/v1/geocode/search?${params}`, {
    method: 'GET'
  });
  const data = await response.json();

  // Extract coordinates from the first feature
  let coordinates = { latitude: 0, longitude: 0 };
  if (data.features && data.features.length > 0) {
    const firstFeature = data.features[0];
    const coords = firstFeature.geometry?.coordinates;

    if (coords && coords.length >= 2) {
      coordinates = {
        latitude: coords[1], // lat is at index 1
        longitude: coords[0] // lon is at index 0
      };
    }
  }

  // Return the complete address object with coordinates
  console.log(address, coordinates);
  return {
    ...address,
    coordinates
  };
};
