'use client';
import './pagination.css';
import React, { useState } from 'react';

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
  const [nextDisabled, setNextDisabled] = useState(false);

  const handleClick = (page: number) => {
    if (page >= 0 && page <= totalPages) {
      setNextDisabled(true);
      onPageChange(page);
      setTimeout(() => {
        setNextDisabled(false);
      }, 500); // disable for 1 second
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 0 || nextDisabled}
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
        disabled={currentPage + 1 === totalPages || nextDisabled}
      >
        &raquo;
      </button>
    </div>
  );
}
