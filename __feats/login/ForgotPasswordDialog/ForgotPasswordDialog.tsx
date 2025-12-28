import { useForgotPassword } from '@/__hooks/user/forgotPassword';
import { forgotPasswordSchema, forgotPasswordSchemaType } from '@/__types/user/forgotPassword';
import FormInput from '@/components/Form/FormInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordDialog() {
  const t = useTranslations('ForgotPasswordDialog');
  const { postForgotPassword, isLoadingPostForgotPassword } = useForgotPassword();

  const form = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = (data: forgotPasswordSchemaType) => {
    postForgotPassword(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="text-sm">
          {t('trigger')}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription hidden>{t('description')}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormInput
              name="email"
              label={t('form.email.label')}
              placeholder={t('form.email.placeholder')}
            />
            <Button
              type="submit"
              variant={'gradient'}
              disabled={isLoadingPostForgotPassword || !form.formState.isValid}
              isLoading={isLoadingPostForgotPassword}
            >
              {t('submit')}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
