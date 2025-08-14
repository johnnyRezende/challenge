import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/Pagination';

describe('Pagination component test cases', () =>
{
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('Should render correct number of page buttons', () =>
  {
    render(<Pagination totalPages={5} currentPage={1} onPageChange={onPageChange} />);
    const buttons = screen.getAllByRole('button');

    // Expect 5 pages + 2 arrows
    expect(buttons).toHaveLength(7);
  });

  it('Should disable previous button on first page', () =>
  {
    render(<Pagination totalPages={5} currentPage={0} onPageChange={onPageChange} />);

    expect(screen.getByText('«')).toBeDisabled();
  });

  it('Should disable next button on last page', () => {
    render(<Pagination totalPages={5} currentPage={5} onPageChange={onPageChange} />);

    setTimeout(() => {
      expect(screen.getByText('»')).toBeDisabled();
    }, 1000);
    
  });

  it('Should call onPageChange when a page number is clicked', () =>
  {
    render(<Pagination totalPages={5} currentPage={2} onPageChange={onPageChange} />);

    // Changing to page 3
    fireEvent.click(screen.getByText('3'));

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('Should call onPageChange when previous buttons are clicked', () =>
  {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);

    //Changing to page 2
    fireEvent.click(screen.getByText('«'));
    expect(onPageChange).toHaveBeenCalledWith(2);

  });

  it('Should call onPageChange when next buttons are clicked', () =>
  {
    render(<Pagination totalPages={5} currentPage={3} onPageChange={onPageChange} />);

    //Changing to page 4
    fireEvent.click(screen.getByText('»'));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
