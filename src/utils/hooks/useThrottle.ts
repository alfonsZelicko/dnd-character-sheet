import { useRef } from 'react';

export const useThrottle = (callback: Function, delay: number) => {
  const lastCall = useRef(0);

  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      callback(...args);
      lastCall.current = now;
    }
  };
};
