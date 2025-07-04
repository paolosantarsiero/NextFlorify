'use client';

import FlowersFooter from 'components/layout/FlowersFooter/FlowersFooter';
import { Product } from 'lib/woocomerce/models/product';
import { useEffect, useRef, useState } from 'react';
import BottomSection from './bottomSection/BottomSection';
import TopSection from './topSection/TopSection';

export default function HomePage() {
  const topSectionRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    topSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    fetch('/api/products')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <div className="flex w-full flex-col">
      <TopSection topSectionRef={topSectionRef} bottomSectionRef={bottomSectionRef} />
      <BottomSection topSectionRef={topSectionRef} bottomSectionRef={bottomSectionRef} />
      <FlowersFooter state={'static'} />
    </div>
  );
}
