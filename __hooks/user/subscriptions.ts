import { getSubscription, getSubscriptionOrders } from '@/__actions/user/subscriptions';
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

export const useSubscriptionOrders = (subscriptionId: string, options?: { enabled?: boolean }) => {
  const query = useQuery({
    queryKey: ['subscriptionOrders', subscriptionId],
    queryFn: () => getSubscriptionOrders(subscriptionId),
    enabled: options?.enabled ?? true
  });

  return {
    subscriptionOrders: query.data,
    isLoadingSubscriptionOrders: query.isLoading,
    isErrorSubscriptionOrders: query.isError
  };
};
