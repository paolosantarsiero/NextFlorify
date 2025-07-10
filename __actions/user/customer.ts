import { Customer } from '@/lib/woocomerce/models/customer';

export const getCustomer = async (): Promise<Customer> => {
  const response = await fetch('/api/customer', {
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
