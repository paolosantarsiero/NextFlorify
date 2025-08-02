import { userMailUpdateSchema, userMailUpdateSchemaType } from '@/__types/user/info';
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

export default function EmailDialog() {
  const tEmailDialogForm = useTranslations('ProfilePage.AccountPage.newEmailDialog.form');
  const tEmailDialog = useTranslations('ProfilePage.AccountPage.newEmailDialog');

  const form = useForm<userMailUpdateSchemaType>({
    resolver: zodResolver(userMailUpdateSchema(tEmailDialogForm))
  });

  const onSubmit = (data: userMailUpdateSchemaType) => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PencilIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription hidden>{tEmailDialog('description')}</DialogDescription>
        <DialogHeader>
          <DialogTitle>{tEmailDialog('title')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Form {...form}>
            <FormInput
              name="new_email"
              label={tEmailDialogForm('new_email.label')}
              placeholder={tEmailDialogForm('new_email.placeholder')}
            />
            <FormInput
              name="repeat_email"
              label={tEmailDialogForm('repeat_email.label')}
              placeholder={tEmailDialogForm('repeat_email.placeholder')}
            />
          </Form>
          <DialogFooter>
            <Button variant={'gradient'} type="submit">
              {tEmailDialog('submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
