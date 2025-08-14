'use client';
import './pagination.css';
import React from 'react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps)
{

  const handleClick = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i);
  console.log("total pages")
  console.log(totalPages)

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`page-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="page-button"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage + 1 === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}
