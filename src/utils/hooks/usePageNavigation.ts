import { useSearchParams } from 'react-router-dom';
import { resolveAppPage } from '../pages';

export const usePageNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeQuery = (newPage: string | ((prevPage: string | null) => string)) => {
    const currentPage = searchParams.get('page');
    const newPageValue = typeof newPage === 'function' ? newPage(currentPage) : newPage;
    const resolvedPage = resolveAppPage(newPageValue);

    if (currentPage === resolvedPage) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', resolvedPage);
    setSearchParams(newSearchParams);
  };

  return [resolveAppPage(searchParams.get('page')), handleChangeQuery] as const;
};
