'use client';

import { ProfileNavigation } from '__feats/profile/ProfileNavigation';
import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col h-screen items-center justify-start">
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-1/2 h-full sm:h-1/2 mt-[20vh]">
        <ProfileNavigation className="w-2/5" />
        <div className="w-3/5 h-full">{children}</div>
      </div>
      <FlowersFooter />
    </section>
  );
}
