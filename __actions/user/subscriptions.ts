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
