'use client';

import { useMutation } from '@tanstack/react-query';
import {
  CreateStripeCheckoutSessionData,
  createStripeCheckoutSession
} from 'lib/custom-api/customApi';

export const STRIPE_CHECKOUT_SESSION_QUERY_KEY = 'stripe-checkout-session';

export const useStripeCheckoutSession = () => {
  const mutation = useMutation({
    mutationKey: [STRIPE_CHECKOUT_SESSION_QUERY_KEY],
    mutationFn: (data: CreateStripeCheckoutSessionData) => createStripeCheckoutSession(data),
    onSuccess: (data) => {
      window.open(data.url, '_blank');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  return {
    createStripeCheckoutSession: mutation.mutate,
    isLoadingStripeCheckoutSession: mutation.isPending,
    isErrorStripeCheckoutSession: mutation.isError,
    errorStripeCheckoutSession: mutation.error,
    dataStripeCheckoutSession: mutation.data
  };
};
