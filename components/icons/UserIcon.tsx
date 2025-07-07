'use client';

import { useSession } from 'next-auth/react';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import GradientOutlineWrapper from '../ui/gradientOutlineWrapper';

export default function UserIcon() {
  const session = useSession();
  const t = useTranslations('Navbar');

  // Handle loading state to prevent hydration mismatch
  if (session.status === 'loading') {
    return (
      <div className="ms-2">
        <GradientOutlineWrapper>
          <Button variant={'gradientOutline'} size="icon" isLoading={true}></Button>
        </GradientOutlineWrapper>
      </div>
    );
  }

  if (session.status === 'authenticated') {
    return (
      <Link href={'/profile'} className="ms-2" aria-label="profile">
        <Avatar>
          <AvatarFallback className="text-white text-lg bg-gradient-to-r from-tiffanyGreen to-violetRose">
            {session.data?.user?.user_display_name?.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    );
  }

  return (
    <Link href={'/login'} className="ms-2" aria-label="login">
      <GradientOutlineWrapper>
        <Button variant={'gradientOutline'} size="icon">
          {t('login')}
        </Button>
      </GradientOutlineWrapper>
    </Link>
  );
}
