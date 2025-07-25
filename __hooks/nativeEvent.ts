import { useEffect } from 'react';

// type: React.RefObject<HTMLElement>, event: string, handler: function, options: addEventListener options
export function useNativeEvent(
  ref: React.RefObject<HTMLElement | null>,
  event:
    | 'wheel'
    | 'touchstart'
    | 'touchmove'
    | 'touchend'
    | 'touchcancel'
    | 'scroll'
    | 'mousemove'
    | 'mousedown'
    | 'mouseup'
    | 'mouseleave'
    | 'mouseenter'
    | 'click',
  handler: (event: Event) => void,
  options: AddEventListenerOptions
) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.addEventListener(event, handler, options);

    return () => {
      node.removeEventListener(event, handler, options);
    };
  }, [ref, event, handler, options]);
}
