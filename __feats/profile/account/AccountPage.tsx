'use client';

import { userInfoUpdateSchema, userInfoUpdateSchemaType } from '@/__types/user/info';
import FieldWrapper from '@/components/FieldWrapper';
import FormInput from '@/components/Form/FormInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import EmailDialog from './emailDialog/EmailDialog';
import PasswordDialog from './passwordDialog/PasswordDialog';

export default function AccountPage() {
  const t = useTranslations('ProfilePage.AccountPage');
  const session = useSession();
  const tInfoForm = useTranslations('ProfilePage.AccountPage.infoForm');
  const infoForm = useForm<userInfoUpdateSchemaType>({
    resolver: zodResolver(userInfoUpdateSchema(tInfoForm)),
    defaultValues: {
      name: session.data?.user?.user_display_name || ''
    }
  });

  const onInfoSubmit = (data: userInfoUpdateSchemaType) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col h-full w-full pb-2.5 justify-between">
      <div className="flex flex-col gap-4">
        <p className="text-normal font-medium">{t('title')}</p>
        <form onSubmit={infoForm.handleSubmit(onInfoSubmit)}>
          <Form {...infoForm}>
            <FormInput
              name="name"
              label={tInfoForm('name.label')}
              placeholder={tInfoForm('name.placeholder')}
            />
          </Form>
        </form>
        <FieldWrapper label="Email" decorator={<EmailDialog />}>
          <Input disabled value={session.data?.user?.user_email} />
        </FieldWrapper>
        <FieldWrapper label="Password" decorator={<PasswordDialog />}>
          <Input disabled value="********" type="password" />
        </FieldWrapper>
      </div>
      <div className="flex flex-row justify-end">
        <Button
          variant={'gradient'}
          type="submit"
          className=""
          onClick={() => infoForm.handleSubmit(onInfoSubmit)}
        >
          {tInfoForm('submit')}
        </Button>
      </div>
    </div>
  );
}
