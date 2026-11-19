import { Dispatch, SetStateAction, useEffect } from 'react';

type UseKeyboardNavigationProps = { isInputFocused: boolean; setCurrentSlide: Dispatch<SetStateAction<number>> };

/* It was made for keyboard navigation... it is obsolete - mby in the future I will implement it again */
export const useKeyboardNavigation = ({ isInputFocused, setCurrentSlide }: UseKeyboardNavigationProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isInputFocused) return;

      if (event.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (event.key === 'ArrowRight') {
        setCurrentSlide((prev) => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInputFocused, setCurrentSlide]);
};
