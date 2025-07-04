import { signup } from '@/__actions/user/signup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export const SIGNUP_QUERY_KEY = 'signup';

export const usePostSignup = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: [SIGNUP_QUERY_KEY],
    mutationFn: signup,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      toast.error('Signup failed');
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
