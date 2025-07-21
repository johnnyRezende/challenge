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
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}