import { useQuery } from '@tanstack/react-query';
import { getCompatibleProducts, getProducts } from '../__actions/Product';

export const PRODUCTS_QUERY_KEY = 'products';
export const COMPATIBLE_PRODUCTS_QUERY_KEY = 'compatibleProducts';

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

export const useCompatibleProducts = (answers: any) => {
  const query = useQuery({
    queryKey: [COMPATIBLE_PRODUCTS_QUERY_KEY, answers],
    queryFn: () => getCompatibleProducts(answers)
  });

  return {
    compatibleProducts: query.data,
    refetchCompatibleProducts: query.refetch,
    isCompatibleProductsLoading: query.isLoading,
    isCompatibleProductsError: query.isError
  };
};
