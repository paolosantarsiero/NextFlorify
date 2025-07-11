'use client';

import { useRef } from 'react';
import BottomSection from './bottomSection/BottomSection';
import TopSection from './topSection/TopSection';

export default function HomePage() {
  const topSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full flex-col">
      <TopSection topSectionRef={topSectionRef} bottomSectionRef={bottomSectionRef} />
      <BottomSection topSectionRef={topSectionRef} bottomSectionRef={bottomSectionRef} />
    </div>
  );
}
