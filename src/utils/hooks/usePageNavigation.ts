import { useSearchParams } from 'react-router-dom';
import { RefObject, useEffect } from 'react';
import { useTouchSwipe } from './useTouchSwipe';

import { SECTIONS } from '../../pages';

export const usePageNavigation = (ref?: RefObject<HTMLElement>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { direction } = useTouchSwipe(ref, { direction: 'horizontal', threshold: 200 });
  const page = +(searchParams.get('page') || 0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      handleChangeQueryPage(page >= SECTIONS.length - 1 ? SECTIONS.length - 1 : page + 1);
    } else {
      handleChangeQueryPage(page <= 0 ? 0 : page - 1);
    }
  };

  useEffect(() => {
    if (direction === 'left' || direction === 'right') {
      handleSwipe(direction);
    }
  }, [direction]);

  const handleChangeQueryPage = (newPage: number) => {
    if (newPage > SECTIONS.length) return;
    if (page === newPage) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    setSearchParams(newSearchParams);
  };

  return [page, handleChangeQueryPage] as const;
};
