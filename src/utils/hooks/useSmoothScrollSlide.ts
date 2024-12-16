import { RefObject, useEffect } from 'react';

const easeInOutCubic = (progress: number): number =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - Math.pow(-2 * progress + 2, 3) / 2;

export const useSmoothScrollToSlide = (page: number, containerRef: RefObject<HTMLElement>): void => {
  const duration = 300;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const target = page * window.innerWidth;
    const startTime = performance.now();

    const animateScroll = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      container.scrollLeft = start + (target - start) * easeInOutCubic(progress);

      if (elapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [page, containerRef, duration]);
};
