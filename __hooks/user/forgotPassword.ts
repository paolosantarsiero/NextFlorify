'use client';

import { forgotPassword } from '@/__actions/user/forgotPassword';
import { forgotPasswordSchemaType } from '@/__types/user/forgotPassword';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const FORGOT_PASSWORD_QUERY_KEY = ['forgotPassword'];

export const useForgotPassword = () => {
  const queryClient = useQueryClient();
  const query = useMutation({
    mutationKey: FORGOT_PASSWORD_QUERY_KEY,
    mutationFn: (data: forgotPasswordSchemaType) => forgotPassword(data),
    onSuccess: () => {
      toast.success('Email sent');
      queryClient.invalidateQueries({ queryKey: FORGOT_PASSWORD_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return {
    postForgotPassword: query.mutate,
    isLoadingPostForgotPassword: query.isPending,
    isErrorPostForgotPassword: query.isError,
    errorPostForgotPassword: query.error
  };
};
