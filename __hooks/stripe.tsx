'use client';

import { useMutation } from '@tanstack/react-query';
import {
  CreateStripeCheckoutSessionDataType,
  createStripeCheckoutSession
} from 'lib/custom-api/customApi';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const STRIPE_CHECKOUT_SESSION_QUERY_KEY = 'stripe-checkout-session';

export const useStripeCheckoutSession = () => {
  const t = useTranslations('subscriptionPage.toast');
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: [STRIPE_CHECKOUT_SESSION_QUERY_KEY],
    mutationFn: (data: CreateStripeCheckoutSessionDataType) => createStripeCheckoutSession(data),
    onSuccess: (data) => {
      router.push(data.url);
    },
    onError: (error) => {
      toast.error(t('stripeError'));
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
