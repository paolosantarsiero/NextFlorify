import { getCustomer } from '@/__actions/user/customer';
import { useQuery } from '@tanstack/react-query';

const GET_CUSTOMER_QUERY_KEY = 'customer';

export const useCustomer = () => {
  const query = useQuery({
    queryKey: [GET_CUSTOMER_QUERY_KEY],
    queryFn: getCustomer
  });

  return {
    customer: query.data,
    isLoadingCustomer: query.isLoading,
    isErrorCustomer: query.isError
  };
};
