'use client';

import { signup } from '@/__actions/user';
import { usePostSignup } from '@/__hooks/user';
import { signupSchema, signupSchemaType } from '@/__types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
  const { postSignup, isLoading, isError, isSuccess, error } = usePostSignup();
  const { formState, handleSubmit, register } = useForm<signupSchemaType>({
    resolver: zodResolver(signupSchema)
  });

  return (
    <section className="mx-auto mt-4 grid max-w-screen-2xl justify-center gap-4 px-4 pb-4">
      <h1 className="text-2xl font-bold">Sign up</h1>

      <div className="flex justify-center">
        <form onSubmit={signup} className="flex w-full max-w-md flex-col"></form>
      </div>
    </section>
  );
}
