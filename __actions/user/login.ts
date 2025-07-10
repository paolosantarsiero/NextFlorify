import { loginSchemaType } from '@/__types/user/login';
import { signIn } from 'next-auth/react';

export const login = async (data: loginSchemaType) => {
  const response = await signIn('credentials', { ...data, redirect: false });
  if (response?.ok) {
    return response;
  } else {
    throw new Error('Login failed');
  }
};
