'use client';

import { signup } from '@/__actions/user/signup';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export const SIGNUP_QUERY_KEY = 'signup';

export const usePostSignup = () => {
  const router = useRouter();
  const t = useTranslations('SignupPage.toast');
  const mutation = useMutation({
    mutationKey: [SIGNUP_QUERY_KEY],
    mutationFn: signup,
    onSuccess: () => {
      toast.success(t('signupSuccessful'));
      router.push('/');
    },
    onError: () => {
      toast.error(t('signupFailed'));
    }
  });

  return {
    postSignup: mutation.mutate,
    isLoadingPostSignup: mutation.isPending,
    isErrorPostSignup: mutation.isError,
    isSuccessPostSignup: mutation.isSuccess,
    errorPostSignup: mutation.error
  };
};
