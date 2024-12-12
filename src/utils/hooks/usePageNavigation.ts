import { useSearchParams } from 'react-router-dom';

export const usePageNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeQuery = (newPage: number | ((prevPage: number | null) => number)) => {
    const currentPage = searchParams.get('page');
    const parsedPage = currentPage !== null ? parseInt(currentPage, 10) : null;

    const newPageValue = typeof newPage === 'function' ? newPage(parsedPage) : newPage;

    if (parsedPage === newPageValue) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPageValue.toString());
    setSearchParams(newSearchParams);
  };

  return [+(searchParams.get('page') || 0), handleChangeQuery] as const;
};
