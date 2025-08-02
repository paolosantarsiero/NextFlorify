'use client';

import { login } from '@/__actions/user/login';
import { useMutation } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const POST_LOGIN_QUERY_KEY = 'post-login';

export const usePostLogin = () => {
  const router = useRouter();
  const t = useTranslations('LoginPage.toast');
  const mutation = useMutation({
    mutationKey: [POST_LOGIN_QUERY_KEY],
    mutationFn: login,
    onSuccess: async () => {
      toast.success(t('loginSuccessful'));
      const session = await getSession();
      const roles = session?.user?.roles ?? [];
      if (roles.includes('wcfm_vendor') || roles.includes('administrator')) {
        window.location.href = `${process.env.NEXT_PUBLIC_WOOCOMMERCE}/sso-login?sso_token=${session!.user.token}`;
      } else {
        router.replace('/');
      }
    },
    onError: (error) => {
      toast.error(t('loginFailed'));
      console.error(error);
    }
  });

  return {
    postLogin: mutation.mutate,
    isLoadingPostLogin: mutation.isPending,
    isErrorPostLogin: mutation.isError
  };
};
