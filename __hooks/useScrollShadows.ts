'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const THRESHOLD = 4;

export function useScrollShadows(enabled: boolean) {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !enabled) {
      setShowTopShadow(false);
      setShowBottomShadow(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isScrollable = scrollHeight > clientHeight;
    const isAtTop = scrollTop <= THRESHOLD;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - THRESHOLD;
    setShowTopShadow(isScrollable && !isAtTop);
    setShowBottomShadow(isScrollable && !isAtBottom);
  }, [enabled]);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [update]);

  return { scrollRef, showTopShadow, showBottomShadow };
}
