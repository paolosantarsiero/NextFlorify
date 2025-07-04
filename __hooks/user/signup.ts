import { signup } from '@/__actions/user/signup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const SIGNUP_QUERY_KEY = 'signup';

export const usePostSignup = () => {
  const mutation = useMutation({
    mutationKey: [SIGNUP_QUERY_KEY],
    mutationFn: signup,
    onSuccess: () => {
      toast.success('Signup successful');
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
