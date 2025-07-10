'use client';

import { useMutation } from '@tanstack/react-query';
import {
  CreateStripeCheckoutSessionDataType,
  createStripeCheckoutSession
} from 'lib/custom-api/customApi';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export const STRIPE_CHECKOUT_SESSION_QUERY_KEY = 'stripe-checkout-session';

export const useStripeCheckoutSession = () => {
  const t = useTranslations('subscriptionPage.toast');
  const mutation = useMutation({
    mutationKey: [STRIPE_CHECKOUT_SESSION_QUERY_KEY],
    mutationFn: (data: CreateStripeCheckoutSessionDataType) => createStripeCheckoutSession(data),
    onSuccess: (data) => {
      console.log('[DEBUG] Stripe checkout session data:', data);
    },
    onError: (error) => {
      toast.error(t('stripeError'));
      console.error(error);
    }
  });

  return {
    createStripeCheckoutSession: mutation.mutate,
    isLoadingStripeCheckoutSession: mutation.isPending,
    isErrorStripeCheckoutSession: mutation.isError,
    errorStripeCheckoutSession: mutation.error,
    stripeCheckoutSessionData: mutation.data
  };
};
