'use server';

import { getCompatibleProductsBody } from '@/__types/product';
import { SubscriptionFlowDataType } from '__flows/subscription/subscriptionQuestionsSchema';
import axios, { AxiosInstance } from 'axios';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';
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

export type Variant = {
  slug: string;
  value: string;
};

export type Answer = {
  slug: string;
  value: string[];
};

// Esempio: crea una sessione di checkout Stripe
export type CreateStripeCheckoutSessionDataType = {
  subscription_type: SubscriptionFlowDataType['preference'] | 'anniversary';
  product_id?: number;
  quantity: number;
  variants?: Variant[];
  answers?: Answer[];
  note?: string;
};

export type CreateStripeCheckoutSessionResponse = {
  id: string;
  url: string;
};

export async function getProductsBySubscriptionType(
  data: getCompatibleProductsBody
): Promise<{
  products: any[];
  related_products: any[];
  subscription: Stripe.Product;
  delivery_date: string;
}> {
  return customApiClient
    .post('/woocommerce/product-subscription', data)
    .then((res) => res.data.responseObject);
}

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
    .then((res: { data: { responseObject: CreateStripeCheckoutSessionResponse } }) => {
      return res.data.responseObject;
    })
    .catch((err) => {
      console.log(err.response.data);
      throw err.response.data.message;
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
