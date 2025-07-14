import { z } from 'zod';

export const userInfoUpdateSchema = (t: any) =>
  z.object({
    name: z.string().min(1, t('name.messages.required'))
  });

export type userInfoUpdateSchemaType = z.infer<ReturnType<typeof userInfoUpdateSchema>>;

export const userMailUpdateSchema = (t: any) =>
  z
    .object({
      new_email: z.string().email({ message: t('new_email.messages.not_valid') }),
      repeat_email: z.string().email({ message: t('repeat_email.messages.not_valid') })
    })
    .refine((data) => data.new_email === data.repeat_email, {
      path: ['repeat_email'],
      message: t('repeat_email.messages.not_match')
    });

export type userMailUpdateSchemaType = z.infer<ReturnType<typeof userMailUpdateSchema>>;

export const userPasswordUpdateSchema = (t: any) =>
  z
    .object({
      new_password: z
        .string()
        .min(8, { message: t('new_password.messages.min') })
        .max(16, { message: t('new_password.messages.max') })
        .refine((data) => /[a-z]/.test(data), { message: t('new_password.messages.lowercase') })
        .refine((data) => /[A-Z]/.test(data), { message: t('new_password.messages.uppercase') })
        .refine((data) => /[0-9]/.test(data), { message: t('new_password.messages.number') })
        .refine((data) => /[!@#$%^&*]/.test(data), { message: t('new_password.messages.special') }),
      repeat_password: z.string().min(8, t('repeat_password.messages.required'))
    })
    .refine((data) => data.new_password === data.repeat_password, {
      path: ['repeat_password'],
      message: t('repeat_password.messages.not_match')
    });

export type userPasswordUpdateSchemaType = z.infer<ReturnType<typeof userPasswordUpdateSchema>>;
