import { loginSchemaType } from '@/__types/user/login';
import { signIn } from 'next-auth/react';

export const login = async (data: loginSchemaType) => {
  return signIn('credentials', { ...data, redirect: false });
};
