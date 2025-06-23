import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../__actions/Product';

export const PRODUCTS_QUERY_KEY = 'products';

export const useProducts = () => {
  const query = useQuery({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: () => getProducts()
  });

  return {
    products: query.data,
    refetchProducts: query.refetch,
    isProductsLoading: query.isLoading,
    isProductsError: query.isError
  };
};
