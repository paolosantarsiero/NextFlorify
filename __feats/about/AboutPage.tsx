'use client';

import { useCssAnimationStore } from '@/__store/cssAnimationsStore';
import { FLOWER_ANIMATION_NAME, FlowerAnimationStates } from '@/__types/animations/flower';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import regione from '../../assets/images/regione.png';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  const { setComponentState } = useCssAnimationStore();

  useEffect(() => {
    setComponentState(FLOWER_ANIMATION_NAME, FlowerAnimationStates.HIDDEN);
    return () => {
      setComponentState(FLOWER_ANIMATION_NAME, FlowerAnimationStates.LOADING_STATIC);
    };
  }, []);

  return (
    <section className="flex flex-col h-screen w-full items-center mt-[80px] overflow-y-scroll">
      <div className="flex flex-col gap-4 w-full max-w-3xl items-center px-3 py-6">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p>{t.rich('content1', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p>{t.rich('content2', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p>{t.rich('content3', { strong: (chunks) => <strong>{chunks}</strong> })}</p>
        <p>{t.rich('content4', { strong: (chunks) => <strong>{chunks}</strong> })}</p>

        <p className="text-sm italic mt-2">{t('credits')}</p>
        <div className="w-full flex justify-center">
          <img src={regione.src} alt="Regione Campania Logo" className="h-20 object-contain" />
        </div>
      </div>
    </section>
  );
}
