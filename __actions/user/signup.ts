import { signupSchemaType } from '@/__types/user/signup';

export const signup = async (data: signupSchemaType) => {
  return fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
