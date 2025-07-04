import { signupSchemaType } from '@/__types/user';

export const signup = async (data: signupSchemaType) => {
  const response = await fetch('/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};
