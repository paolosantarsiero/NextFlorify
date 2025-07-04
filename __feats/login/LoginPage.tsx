'use client';

import { usePostLogin } from '@/__hooks/user/login';
import { loginSchema, loginSchemaType } from '@/__types/user/login';
import FormInput from '@/components/Form/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const tPage = useTranslations('LoginPage');
  const tForm = useTranslations('LoginPage.form');
  const { postLogin, isLoadingPostLogin } = usePostLogin();
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema(tForm)),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = (data: loginSchemaType) => {
    postLogin(data);
  };

  return (
    <section className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md items-center">
        <h1 className="text-2xl font-bold">{tPage('title')}</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Form {...form}>
            <FormInput
              name="username"
              label={tForm('username.label')}
              placeholder={tForm('username.placeholder')}
            />
            <FormInput
              name="password"
              label={tForm('password.label')}
              placeholder={tForm('password.placeholder')}
              type="password"
            />
            <Button variant="gradient" type="submit" isLoading={isLoadingPostLogin}>
              Sign up
            </Button>
          </Form>
        </form>
      </div>
    </section>
  );
}
