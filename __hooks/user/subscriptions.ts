import { getSubscription } from '@/__actions/user/subscriptions';
import { useQuery } from '@tanstack/react-query';

const GET_SUBSCRIPTION_QUERY_KEY = 'subscription';

export const useSubscription = () => {
  const query = useQuery({
    queryKey: [GET_SUBSCRIPTION_QUERY_KEY],
    queryFn: getSubscription
  });

  return {
    subscription: query.data,
    isLoadingSubscription: query.isLoading,
    isErrorSubscription: query.isError
  };
};
