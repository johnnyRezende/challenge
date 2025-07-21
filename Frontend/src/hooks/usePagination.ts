import { useState } from 'react';

export const usePagination = <T> (data: T[], pageSizes: number[] = [5, 10, 15, 25]):
{
  totalItems: number;
  page: T[];
  pageSizes: number[];
  changePage: Function;
} => {

  const [pageSize, setPageSize] = useState(pageSizes[0]);
  const [page, setPage]         = useState(data.slice(0, pageSize));

  const changePage = ({page, pageSize}: {
    page:     number;
    pageSize: number;
  }) => {
    setPage(data.slice((page - 1) * pageSize, page * pageSize));
    setPageSize(pageSize);
  };

  return {
    totalItems: data.length,
    page,
    pageSizes,
    changePage,
  };
};
