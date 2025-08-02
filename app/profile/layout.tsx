'use client';

import { useCustomer } from '@/__hooks/user/customer';
import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { FLOWER_ANIMATION_NAME, FlowerAnimationStates } from '@/__types/animations/flower';
import LoadingDataScreen from '@/components/DataFetching/LoadingDataScreen';
import { ProfileNavigation } from '__feats/profile/ProfileNavigation';
import { useEffect } from 'react';

export default function ProfileLayout({ tab }: { tab: React.ReactNode }) {
  const { customer, isLoadingCustomer, isErrorCustomer } = useCustomer();
  const { setComponentState } = useCssAnimationStore();

  useEffect(() => {
    setComponentState(FLOWER_ANIMATION_NAME, FlowerAnimationStates.HIDDEN);
    return () => {
      setComponentState(FLOWER_ANIMATION_NAME, FlowerAnimationStates.LOADING_STATIC);
    };
  }, []);

  return (
    <section className="flex w-full flex-col h-screen items-center justify-start">
      {isLoadingCustomer ? (
        <LoadingDataScreen />
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-7 w-full h-full pt-15 sm:pt-40 items-center sm:items-start sm:justify-center">
          <ProfileNavigation customer={customer ?? null} />
          <div className="w-100 h-106 sm:pt-8 px-6 sm:px-0">{tab}</div>
        </div>
      )}
    </section>
  );
}
