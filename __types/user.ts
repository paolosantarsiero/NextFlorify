import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string(),
  confirmPassword: z.string()
});

export type signupSchemaType = z.infer<typeof signupSchema>;
