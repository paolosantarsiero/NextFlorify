'use client';

import { Avatar } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FloriAvatar } from 'assets/images/FloriAvatar';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function AvatarPopover() {
  const t = useTranslations('Navbar');
  const session = useSession();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <FloriAvatar />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-39 p-4" align="end">
        <div className="flex flex-col gap-2 items-end">
          <Avatar className="w-6 h-6">
            <FloriAvatar className="w-6 h-6" />
          </Avatar>
          <p className="font-medium text-dark-violet ">
            {t('menu.hello')}{' '}
            <span className="font-bold">{session.data?.user?.user_display_name}</span>
          </p>
          <Link href={'/profile'} className="text-sm text-faded-dark-violet">
            {t('menu.profile')}
          </Link>
          <p
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-sm text-faded-dark-violet cursor-pointer"
          >
            {t('menu.logout')}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
