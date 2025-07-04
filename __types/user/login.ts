import { z } from 'zod';

export const loginSchema = (t: any) => {
  return z.object({
    username: z.string().email({ message: t('username.messages.invalid') }),
    password: z.string().min(8, { message: t('password.messages.min') })
  });
};

export type loginSchemaType = z.infer<ReturnType<typeof loginSchema>>;
