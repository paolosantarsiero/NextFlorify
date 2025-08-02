import { getCoordinates } from '@/__actions/geocoding';
import { GetCoordinatesType } from '@/__types/geocoding';
import { useMutation } from '@tanstack/react-query';

export const useGetCoordinates = () => {
  const query = useMutation({
    mutationFn: (address: GetCoordinatesType) => getCoordinates(address)
  });

  return {
    mutate: query.mutate,
    coordinates: query.data,
    isLoadingCoordinates: query.isPending,
    isErrorCoordinates: query.isError
  };
};
