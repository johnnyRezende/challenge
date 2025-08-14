'use client'
import React from 'react';
import DataTable from "@/components/DataTable";
import { useEffect, useState } from "react";
import { fetchMovies } from "@/actions/app.actions";
import Pagination from "@/components/Pagination";
import { YesNoSelect } from "@/components/ListPage/filters";
import { FilterByYear } from "@/components/ListPage/filters";
import { type Movie } from "@/types/movie";
import { useDebounce } from '@/hooks/useDebounce';
export default function List()
{
  /**
   * Data to display
   */
  const [allMovies, setAllMovies]        = useState<Movie[]>([]);

  /**
   * Pagination
   */
  const [currentPage, setCurrentPage]    = useState(0);
  const [totalPages, setTotalPages]      = useState(0)

  /**
   * Filters
   */
  const [winnerFilter, setWinnerFilter] = useState('');
  const [yearInput, setYearInput]       = useState(0);
  const [yearFilter, setYearFilter]     = useState(0);

  const debouncedYear = useDebounce(yearInput, 1000);

  useEffect(() => {
    const yearNumber = Number(debouncedYear);
    if (!isNaN(yearNumber)) {
      setYearFilter(yearNumber);
      setCurrentPage(0);
    }
  }, [debouncedYear]);

  useEffect(() => {
    fetchMovies({
      winner: winnerFilter,
      year: yearFilter,
      page: currentPage,
    })
      .then((result) => {
        setAllMovies(result.content);
        setTotalPages(result.totalPages);
        setCurrentPage(result.pageNumber);
      })
      .catch((error) => {
        alert(error.message);
        setAllMovies([]);
        setTotalPages(0);
      });
  }, [currentPage, winnerFilter, yearFilter]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <DataTable
        className="header-text-align-center"
        title="List Movies"
        headers={["ID", "Year", "Title", "Winner?"]}
        columns={["id", "year", "title", "winner"]}
        data={allMovies}
        filters={[
          {
            header: "Winner?",
            element: (
              <YesNoSelect
                value={winnerFilter}
                onChange={(e) => {
                  setWinnerFilter(e);
                  setCurrentPage(0);
                }}
              />
            ),
          },
          {
            header: "Year",
            element: (
              <FilterByYear
                value={yearInput}
                onChange={(e) => {
                  setYearInput(Number(e))
                }}
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
