'use server';

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.CUSTOM_API_URL || 'http://localhost:8080';

export const customApiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Esempio: crea una sessione di checkout Stripe
export type CreateStripeCheckoutSessionData = {
  customer_id: number;
  customer_email: string;
  products: Array<{ product_id: number; quantity: number }>;
  line_items: Array<{ price: string; quantity: number }>;
  changeEveryTime: boolean;
};

export type CreateStripeCheckoutSessionResponse = {
  id: string;
  url: string;
};

export async function createStripeCheckoutSession(
  data: CreateStripeCheckoutSessionData
): Promise<CreateStripeCheckoutSessionResponse> {
  console.log(process.env.CUSTOM_API_URL);
  return customApiClient
    .post('/stripe/create-checkout-session', data)
    .then((res) => res.data.responseObject);
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
