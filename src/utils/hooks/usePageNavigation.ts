import { useSearchParams } from 'react-router-dom';

export const usePageNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeQuery = (newPage: string | ((prevPage: string | null) => string)) => {
    const currentPage = searchParams.get('page');
    const newPageValue = typeof newPage === 'function' ? newPage(currentPage) : newPage;

    if (currentPage === newPageValue) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPageValue);
    setSearchParams(newSearchParams);
  };

  return [searchParams.get('page') ?? '0', handleChangeQuery] as const;
};
