import { login } from '@/__actions/user/login';
import { useMutation } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const POST_LOGIN_QUERY_KEY = 'post-login';

export const usePostLogin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: [POST_LOGIN_QUERY_KEY],
    mutationFn: login,
    onSuccess: async (res) => {
      if (res?.ok) {
        const session = await getSession();
        const roles = session?.user?.roles ?? [];
        if (roles.includes('wcfm_vendor') || roles.includes('administrator')) {
          window.location.href = `${process.env.NEXT_PUBLIC_WOOCOMMERCE}/sso-login?sso_token=${session!.user.token}`;
        } else {
          router.replace('/');
        }
      }
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return {
    postLogin: mutation.mutate,
    isLoadingPostLogin: mutation.isPending,
    isErrorPostLogin: mutation.isError
  };
};
