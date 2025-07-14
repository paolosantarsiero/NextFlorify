import { userPasswordUpdateSchema, userPasswordUpdateSchemaType } from '@/__types/user/info';
import FormInput from '@/components/Form/FormInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

export default function PasswordDialog() {
  const tPasswordDialog = useTranslations('ProfilePage.AccountPage.newPasswordDialog');
  const tPasswordDialogForm = useTranslations('ProfilePage.AccountPage.newPasswordDialog.form');

  const form = useForm<userPasswordUpdateSchemaType>({
    resolver: zodResolver(userPasswordUpdateSchema(tPasswordDialogForm))
  });

  const onSubmit = (data: userPasswordUpdateSchemaType) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden>{tPasswordDialog('description')}</DialogDescription>
        <DialogHeader>
          <DialogTitle>{tPasswordDialog('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Form {...form}>
            <FormInput
              name="new_password"
              label={tPasswordDialogForm('new_password.label')}
              placeholder={tPasswordDialogForm('new_password.placeholder')}
            />
            <FormInput
              name="repeat_password"
              label={tPasswordDialogForm('repeat_password.label')}
              placeholder={tPasswordDialogForm('repeat_password.placeholder')}
            />
          </Form>
          <DialogFooter>
            <Button variant={'gradient'} type="submit">
              {tPasswordDialog('submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
