import { Button } from '@/components/ui/button';
import GradientOutlineWrapper from '@/components/ui/gradientOutlineWrapper';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { getSession } from 'next-auth/react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function UserIcon() {
  const session = await getSession();
  const t = await getTranslations('Navbar');

  if (session) {
    return (
      <Link href={'/profile'} className="ms-2" aria-label="profile">
        <UserCircleIcon className="h-4 transition-all ease-in-out hover:scale-110" />
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
