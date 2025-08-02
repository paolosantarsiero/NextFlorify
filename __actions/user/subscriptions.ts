import { Order } from '@/lib/woocomerce/models/orders';
import Stripe from 'stripe';

export const getSubscription = async (): Promise<Stripe.Subscription[]> => {
  const response = await fetch('/api/customer/subscriptions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getSubscriptionOrders = async (subscriptionId: string): Promise<Order[]> => {
  const response = await fetch(
    `/api/customer/subscriptions/orders?subscriptionId=${subscriptionId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const cancelSubscription = async (subscriptionId: string): Promise<void> => {
  const response = await fetch(`/api/customer/subscriptions?subscriptionId=${subscriptionId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
