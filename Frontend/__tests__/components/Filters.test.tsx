import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { YesNoSelect, FilterByYear } from '@/components/ListPage/filters'; // ajuste o caminho conforme necessário

describe('YesNoSelect component test cases', () =>
{
  it('Should render all options', () => {
    render(<YesNoSelect value="" onChange={() => {}} />);

    expect(screen.getByText('Yes/No')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
  });

  it('Should call onChange with "yes" when Yes is selected', () =>
  {
    const handleChange = jest.fn();
    render(<YesNoSelect value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'yes' } });

    expect(handleChange).toHaveBeenCalledWith('yes');
  });

  it('Should call onChange with "no" when No is selected', () => {
    const handleChange = jest.fn();
    render(<YesNoSelect value="" onChange={handleChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'no' } });

    expect(handleChange).toHaveBeenCalledWith('no');
  });

  it('Should show the current value as yes', () => {
    render(<YesNoSelect value="yes" onChange={() => {}} />);

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('yes');
  });

  it('Should throw an error if no onChange function is provided', () =>
  {
    expect(() => render(<YesNoSelect value="yes" onChange={undefined} />)).toThrow(
      'YesNo Select component requires onChange function'
    );
  })
});


describe('FilterByYear component test cases', () =>
{
  it('Should render year 2025', () => {
    render(<FilterByYear value={2025} onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Filter by year') as HTMLInputElement;
    expect(input.value).toBe('2025');
  });

  it('Should render empty string when value is 0', () => {
    render(<FilterByYear value={0} onChange={() => {}} />);

    const input = screen.getByPlaceholderText('Filter by year') as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('Should call onChange when input changes', () => {
    const handleChange = jest.fn();
    render(<FilterByYear value={2025} onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Filter by year');
    fireEvent.change(input, { target: { value: '1999' } });

    expect(handleChange).toHaveBeenCalledWith('1999');
  });

  it('Should throw an error if no onChange function is provided', () =>
  {
    expect(() => render(<FilterByYear value={2025} onChange={undefined} />)).toThrow(
      'FilterByYear Select component requires onChange function'
    );
  })
});
