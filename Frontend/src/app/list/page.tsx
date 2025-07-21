'use client'
import React from 'react';
import DataTable from "@/components/DataTable";
import { useEffect, useState } from "react";
import { fetchAllMovies } from "@/actions/app.actions";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { YesNoSelect } from "@/components/ListPage/filters";
import { FilterByYear } from "@/components/ListPage/filters";
import { type Movie } from "@/types/movie";

export default function List()
{
  /**
   * Data to display
   */
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([])
  const [allMovies, setAllMovies]           = useState<Movie[]>([]);

  /**
   * Pagination
   */
  const [currentPage, setCurrentPage]    = useState(1);
  const pageSize                         = 10;
  const { page, totalItems, changePage } = usePagination(filteredMovies ?? allMovies, [pageSize]);
  const totalPages                       = Math.ceil(totalItems / pageSize);

  /**
   * Filters
   */
  const [winnerFilter, setWinnerFilter] = useState('');
  const [yearFilter, setYearFilter]     = useState(0);

  useEffect(() => {
    fetchAllMovies().then((result: Movie[]) =>
    {
      setAllMovies(result)

    }).catch((error) => {
      alert(error.message)
    })
  }, [])

  useEffect(() => {
    changePage({ page: currentPage, pageSize });
  }, [filteredMovies, currentPage]);

  useEffect(() =>
  {
    let filteredMovies = yearFilter ? allMovies.filter((movie: Movie) =>
      movie.year === yearFilter
    ): allMovies;

    filteredMovies = winnerFilter ? filteredMovies.filter((movie: Movie) =>
      movie.winner.toLowerCase() === winnerFilter
    ) : filteredMovies

    setFilteredMovies(filteredMovies);
  }, [yearFilter, winnerFilter, allMovies]);


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    changePage({ page: pageNumber, pageSize });
  };

  return (
    <>
      <DataTable
        className="header-text-align-center"
        title="List Movies"
        headers={["ID", "Year", "Title", "Winner?"]}
        columns={["id", "year", "title", "winner"]}
        data={page}
        filters={[
          {
            header: "Winner?",
            element: (
              <YesNoSelect
                value={winnerFilter}
                onChange={(e) => {
                  setWinnerFilter(e);
                }}
              />
            ),
          },
          {
            header: "Year",
            element: (
              <FilterByYear
                value={yearFilter}
                onChange={(e) => {setYearFilter(Number(e))}}
              />
            ),
          },
        ]}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}