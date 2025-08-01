'use client';

import { usePostSignup } from '@/__hooks/user/signup';
import { signupSchema, signupSchemaType } from '@/__types/user/signup';
import FormInput from '@/components/Form/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function SignupPage() {
  const searchParams = useSearchParams();
  const tPage = useTranslations('SignupPage');
  const tForm = useTranslations('SignupPage.form');
  const { postSignup, isLoadingPostSignup } = usePostSignup();
  const form = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema(tForm)),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: signupSchemaType) => {
    postSignup(data);
  };

  return (
    <section className="flex flex-col h-screen w-full items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-md items-center">
        {searchParams.get('message') && (
          <p className="text-red-500">{searchParams.get('message')}</p>
        )}
        <h1 className="text-2xl font-bold">{tPage('title')}</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
          <Form {...form}>
            <FormInput
              name="first_name"
              label={tForm('first_name.label')}
              placeholder={tForm('first_name.placeholder')}
            />
            <FormInput
              name="last_name"
              label={tForm('last_name.label')}
              placeholder={tForm('last_name.placeholder')}
            />
            <FormInput
              name="email"
              label={tForm('email.label')}
              placeholder={tForm('email.placeholder')}
            />
            <FormInput
              name="password"
              label={tForm('password.label')}
              placeholder={tForm('password.placeholder')}
              type="password"
            />
            <FormInput
              name="confirmPassword"
              label={tForm('confirmPassword.label')}
              placeholder={tForm('confirmPassword.placeholder')}
              type="password"
            />
            <Button variant="gradient" type="submit" isLoading={isLoadingPostSignup}>
              {tForm('submit')}
            </Button>
          </Form>
        </form>
      </div>
    </section>
  );
}
