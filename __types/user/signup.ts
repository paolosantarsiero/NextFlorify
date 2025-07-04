import { z } from 'zod';

export const signupSchema = (t: any) => {
  return z
    .object({
      username: z.string().min(3, { message: t('username.messages.min') }),
      email: z.string().email({ message: t('email.messages.invalid') }),
      password: z
        .string()
        .min(8, { message: t('password.messages.min') })
        .max(16, { message: t('password.messages.max') })
        .refine((data) => /[a-z]/.test(data), { message: t('password.messages.lowercase') })
        .refine((data) => /[A-Z]/.test(data), { message: t('password.messages.uppercase') })
        .refine((data) => /[0-9]/.test(data), { message: t('password.messages.number') })
        .refine((data) => /[!@#$%^&*]/.test(data), { message: t('password.messages.special') }),
      confirmPassword: z.string()
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: t('confirmPassword.messages.match')
        });
      }
    });
};

export type signupSchemaType = z.infer<ReturnType<typeof signupSchema>>;
