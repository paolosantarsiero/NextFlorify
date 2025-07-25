'use client';

import { useSession } from 'next-auth/react';

import { useIsMobile } from '@/__hooks/IsMobile';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import GradientOutlineWrapper from '../ui/gradientOutlineWrapper';
import AvatarDrawer from './AvatarDrawer/AvatarDrawer';
import AvatarPopover from './AvatarPopover/AvatarPopover';

export default function UserIcon() {
  const session = useSession();
  const t = useTranslations('Navbar');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  if (session.status === 'authenticated' && !isMobile) {
    return <AvatarPopover />;
  }

  if (isMobile) {
    return <AvatarDrawer />;
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
