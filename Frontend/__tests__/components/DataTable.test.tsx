import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTable from '@/components/DataTable';

type studiosWinCount = {
  name: string;
  winCount: number;
};

const mockData: studiosWinCount[] = [
  { name: 'Paramount Pictures', winCount: 2},
  { name: '20th Century Fox',   winCount: 2},
  { name: 'Warner Bros.',       winCount: 2},
];

describe('DataTable component test cases', () =>
{
  it('Should render title, headers, and rows correctly', () => {
    render(
      <DataTable
        title="Top 3 studios with winners"
        headers={["name", "Win Count"]}
        columns={["name", "winCount"]}
        data={mockData}
      />
    );

    expect(screen.getByText('Top 3 studios with winners')).toBeInTheDocument();
    expect(screen.getByText('Paramount Pictures')).toBeInTheDocument();
    expect(screen.getByText('Warner Bros.')).toBeInTheDocument();
  })

  it('Should render filters if provided', () =>
  {
    render(
      <DataTable
        title="With Filters"
        headers={["Name"]}
        columns={["name"]}
        data={mockData}
        filters={[{
          header: "Name",
          element: (
            <select data-testid="filter-select">
              <option>A</option>
            </select>
          ),
        },]}
      />
    );

    expect(screen.getByTestId('filter-select')).toBeInTheDocument();
  });

  it('Should search results with local search', async () =>
  {
    render(
      <DataTable
        title="Top 3 studios with winners"
        headers={["name", "Win Count"]}
        columns={["name", "winCount"]}
        data={mockData}
        searchable
      />
    );

    const input = screen.getByPlaceholderText('Search by name');

    fireEvent.change(input, { target: { value: "Paramount" } });
    fireEvent.click(screen.getByLabelText('Search'));

    await waitFor(() => {
      expect(screen.getByText('Paramount Pictures')).toBeInTheDocument();
      expect(screen.queryByText('Marvel Studios')).not.toBeInTheDocument();
    });
  });

  it('Should call async api search function and updates table', async () =>
  {
    const mockSearch = jest.fn().mockResolvedValue([
      { name: 'Triumph Films', winCount: 20},,
    ]);

    render(
      <DataTable
        title="Top 3 studios with winners"
        headers={["name", "Win Count"]}
        columns={["name", "winCount"]}
        data={mockData}
        searchable
        searchFunction={mockSearch}
      />
    );

    const input = screen.getByPlaceholderText('Search by name');

    fireEvent.change(input, { target: { value: 'Triumph' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Triumph');
      expect(screen.getByText('Triumph Films')).toBeInTheDocument();
    });
  });


  it('Should show alert if async search called without query', () =>
  {
    const alertMock  = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const mockSearch = jest.fn();

    render(
      <DataTable
        title="Empty Search"
        headers={['ID']}
        columns={['id']}
        data={[]}
        searchable
        searchFunction={mockSearch}
      />
    );

    const button = screen.getByText('🔍');
    fireEvent.click(button);

    expect(alertMock).toHaveBeenCalledWith('No parameter provided for search');
    alertMock.mockRestore();
  });

})
