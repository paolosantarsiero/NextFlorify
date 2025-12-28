'use server';

import { forgotPasswordSchemaType } from '@/__types/user/forgotPassword';
import { woocommerce } from '@/lib/woocomerce/woocommerce';

export const forgotPassword = async (data: forgotPasswordSchemaType) => {
  try {
    await woocommerce.post('/password/forgot', data);
    return true;
  } catch (error: Error | any) {
    throw Error('Failed to send forgot password email: ' + error.message);
  }
};
