'use client';

import { Flowers } from 'assets/images/Flowers';
import { useEffect, useRef } from 'react';
import BottomSection from './bottomSection/BottomSection';
import TopSection from './topSection/TopSection';

export default function HomePage() {
  const topSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex w-full flex-col">
      <TopSection topSectionRef={topSectionRef} bottomSectionRef={bottomSectionRef} />
      <BottomSection topSectionRef={topSectionRef} bottomSectionRef={bottomSectionRef} />
      <div className="sticky bottom-0 w-full flex flex-row justify-between">
        <Flowers className="w-1/3" />
        <Flowers className="w-1/3" />
        <Flowers className="w-1/3" />
      </div>
    </div>
  );
}
