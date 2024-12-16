import { RefObject, useEffect, useState } from 'react';

type UseTouchSwipeOptions = {
  direction?: 'horizontal' | 'vertical';
  threshold?: number;
};

export const useTouchSwipe = (
  ref?: RefObject<HTMLElement>,
  options: UseTouchSwipeOptions = { direction: 'horizontal', threshold: 15 }
) => {
  const { direction = 'horizontal', threshold = 15 } = options;

  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [startTouch, setStartTouch] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      setStartTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!startTouch) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - startTouch.x;
      const deltaY = touch.clientY - startTouch.y;

      if (direction === 'horizontal' && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > threshold) {
        setSwipeDirection(deltaX > 0 ? 'right' : 'left');
      } else if (direction === 'vertical' && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > threshold) {
        setSwipeDirection(deltaY > 0 ? 'down' : 'up');
      }
    };

    const handleTouchEnd = () => {
      setStartTouch(null);
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, startTouch, direction, threshold]);

  return { direction: swipeDirection };
};
