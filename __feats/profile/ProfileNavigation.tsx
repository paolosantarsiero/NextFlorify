import { useCustomer } from '@/__hooks/user/customer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  className?: string;
};

export const ProfileNavigation = ({ className }: Props) => {
  const t = useTranslations('ProfilePage');
  const { customer, isLoadingCustomer, isErrorCustomer } = useCustomer();

  return (
    <Card className={cn('w-full h-full bg-engravedCard', className)}>
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="w-8 h-8">
          <AvatarFallback>
            <UserIcon className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-lg font-light">
          {t('user.hi')} <span className="font-bold">{customer?.first_name}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
