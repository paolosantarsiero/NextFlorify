import { useEffect } from 'react';

type ScrollHandler = {
  onScroll?: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
  onWheel?: (
    event: WheelEvent,
    scrollTop?: number,
    scrollHeight?: number,
    clientHeight?: number
  ) => void;

  // Propagazione
  stopScrollPropagation?: boolean;
  stopWheelPropagation?: boolean;
  preventWheelDefault?: boolean;
};

export function useScrollListener(
  ref: React.RefObject<HTMLElement | null>,
  {
    onScroll,
    onWheel,
    stopScrollPropagation = false,
    stopWheelPropagation = false,
    preventWheelDefault = false
  }: ScrollHandler
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = (event: Event) => {
      if (stopScrollPropagation) event.stopPropagation();
      onScroll?.(el.scrollTop, el.scrollHeight, el.clientHeight);
    };

    const handleWheel = (event: WheelEvent) => {
      if (stopWheelPropagation) event.stopPropagation();
      if (preventWheelDefault) event.preventDefault();
      onWheel?.(event, el.scrollTop, el.scrollHeight, el.clientHeight);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('wheel', handleWheel, { passive: !preventWheelDefault });

    return () => {
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [ref, onScroll, onWheel, stopScrollPropagation, stopWheelPropagation, preventWheelDefault]);
}
