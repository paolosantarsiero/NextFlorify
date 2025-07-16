'use server';

import axios, { AxiosInstance } from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/config';

const API_BASE_URL = process.env.CUSTOM_API_URL || 'http://localhost:8080';

export const customApiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Esempio: crea una sessione di checkout Stripe
export type CreateStripeCheckoutSessionDataType = {
  subscription_type: 'flower' | 'plant' | 'anniversary';
  product_id?: number;
  quantity: number;
  variants?: Array<{
    slug: string;
    value: string;
  }>;
  selected_days?: number[]; // default []
  answers?: Record<string, any>;
  note?: string;
};

export type CreateStripeCheckoutSessionResponse = {
  id: string;
  url: string;
};

export async function createStripeCheckoutSession(
  data: CreateStripeCheckoutSessionDataType
): Promise<CreateStripeCheckoutSessionResponse> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.token) {
    throw new Error('User not authenticated');
  }

  return customApiClient
    .post('/stripe/create-checkout-session', data, {
      headers: {
        ...customApiClient.defaults.headers.common,
        Authorization: `Bearer ${session.user.token}`
      }
    })
    .then((res) => {
      return res.data.responseObject as CreateStripeCheckoutSessionResponse;
    });
}

// Esempio: recupera le subscription di un customer
export async function getCustomerSubscriptions(customerId: string) {
  return customApiClient
    .get(`/customers/${customerId}/subscriptions`)
    .then((res) => res.data.responseObject);
}

// Esempio: cancella una subscription
export async function deleteCustomerSubscription(customerId: string, subscriptionId: string) {
  return customApiClient
    .delete(`/customers/${customerId}/subscriptions/${subscriptionId}`)
    .then((res) => res.data.responseObject);
}
