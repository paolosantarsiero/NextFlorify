import { useTabNavigation } from '@/__hooks/TabNavigation';
import { TabsPaths } from '@/__types/navigation/tabsPaths';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { Customer } from '@/lib/woocomerce/models/customer';
import { FloriAvatar } from 'assets/images/FloriAvatar';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

type Props = {
  customer: Customer | null;
};

export const ProfileNavigation = ({ customer }: Props) => {
  const tHeader = useTranslations('ProfilePage.ProfileNavigation.header');
  const tTabs = useTranslations('ProfilePage.ProfileNavigation.tabs');
  const tabsPaths: TabsPaths[] = [
    {
      path: '/profile',
      value: tTabs('subscriptions')
    },
    {
      path: '/profile/account',
      value: tTabs('account')
    },
    {
      path: '/profile/faq',
      value: tTabs('faq')
    }
  ];
  const { currentPath } = useTabNavigation(tabsPaths);

  return (
    <Card
      variant={'flat'}
      className={cn(
        'w-full sm:w-58 md:h-106 bg-transparent sm:bg-[#FBFBFB] md:sticky top-0 overflow-hidden shrink-0 px-4'
      )}
    >
      <div className="w-[1px] absolute top-5 bottom-5 right-0 shadow-[-1px_0_12px_rgba(0,0,0,0.5)] rounded-[50%]"></div>

      <CardHeader className="flex-row items-center gap-4 pb-0 mb-4 justify-center sm:justify-start">
        <Avatar className="hidden sm:block ">
          <FloriAvatar />
        </Avatar>
        <CardTitle className="text-lg font-light leading-6">
          {tHeader('hi')} <span className="font-bold">{customer?.first_name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center sm:items-end">
        <div className="flex flex-row sm:flex-col gap-2 items-center sm:items-end">
          {tabsPaths.map((tab) => {
            return (
              <Link href={tab.path} key={tab.value}>
                <Toggle
                  className="rounded-full"
                  data-state={currentPath?.path === tab.path ? 'on' : 'off'}
                >
                  {tab.value}
                </Toggle>
              </Link>
            );
          })}
          <Button
            variant={'ghost'}
            className="rounded-full text-muted-foreground hover:text-foreground "
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            {tTabs('logout')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
