'use client';

import { useEffect, useRef } from 'react';

type SwipeDirection = 'up' | 'down';

type ScrollHandler = {
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
  onWheel?: (
    event: WheelEvent,
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => void;
  onTouchMove?: (
    event: TouchEvent,
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => void;
  onSwipe?: (
    direction: SwipeDirection,
    event: TouchEvent,
    scrollTop: number,
    scrollHeight: number,
    clientHeight: number
  ) => void;

  stopScrollPropagation?: boolean;
  stopWheelPropagation?: boolean;
  preventWheelDefault?: boolean;
  stopTouchPropagation?: boolean;
  preventTouchDefault?: boolean;
};

export function useScrollListener(
  ref: React.RefObject<HTMLElement | null>,
  {
    onScroll,
    onWheel,
    onTouchMove,
    onSwipe,
    stopScrollPropagation = false,
    stopWheelPropagation = false,
    preventWheelDefault = false,
    stopTouchPropagation = false,
    preventTouchDefault = false
  }: ScrollHandler
) {
  const touchStart = useRef<{ y: number; time: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const getScrollData = () => [el.scrollTop, el.scrollHeight, el.clientHeight] as const;

    const handleScroll = (e: Event) => {
      if (stopScrollPropagation) e.stopPropagation();
      onScroll?.(...getScrollData());
    };

    const handleWheel = (e: WheelEvent) => {
      if (stopWheelPropagation) e.stopPropagation();
      if (preventWheelDefault) e.preventDefault();
      onWheel?.(e, ...getScrollData());
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        touchStart.current = {
          y: touch.clientY,
          time: Date.now()
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (stopTouchPropagation) e.stopPropagation();
      if (preventTouchDefault) e.preventDefault();
      onTouchMove?.(e, ...getScrollData());
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (stopTouchPropagation) e.stopPropagation();
      if (preventTouchDefault) e.preventDefault();

      const start = touchStart.current;
      const touch = e.changedTouches[0];
      if (!start || !touch) return;

      const dy = touch.clientY - start.y;
      const dt = Date.now() - start.time;

      if (Math.abs(dy) < 10 || dt > 2000) return;

      const direction: SwipeDirection = dy > 0 ? 'down' : 'up';
      onSwipe?.(direction, e, ...getScrollData());

      touchStart.current = null;
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: !preventWheelDefault });
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: !preventTouchDefault });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
      el.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [
    ref,
    onScroll,
    onWheel,
    onTouchMove,
    onSwipe,
    stopScrollPropagation,
    stopWheelPropagation,
    preventWheelDefault,
    stopTouchPropagation,
    preventTouchDefault
  ]);
}
