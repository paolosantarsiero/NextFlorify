import { getCoordinates } from '@/__actions/geocoding';
import { CoordinatesType } from '@/__types/geocoding';
import { useMutation } from '@tanstack/react-query';

export const useGetCoordinates = () => {
  const query = useMutation({
    mutationFn: (coordinates: CoordinatesType) => getCoordinates(coordinates)
  });

  return {
    mutate: query.mutate,
    coordinates: query.data,
    isLoadingCoordinates: query.isPending,
    isErrorCoordinates: query.isError
  };
};
