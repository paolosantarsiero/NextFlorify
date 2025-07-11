'use client';

import { ProfileNavigation } from '__feats/profile/ProfileNavigation';

export default function ProfileLayout({ tab }: { tab: React.ReactNode }) {
  return (
    <section className="flex w-full flex-col h-screen items-center justify-start">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 w-full h-full pt-31 sm:pt-56 items-center sm:items-start sm:justify-center">
        <ProfileNavigation />
        <div className="w-100 h-106 sm:pt-8 px-6 sm:px-0">{tab}</div>
      </div>
    </section>
  );
}
