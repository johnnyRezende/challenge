'use client';
import './DataTable.css'

import { useEffect, useState } from 'react';

type CustomFilter = {
  header: string;
  element: React.ReactNode;
};

type DataTableProps<T> = {
  className?: string
  title: string,
  headers: string[];
  columns: (keyof T)[];
  data: T[];
  searchable?: boolean;
  searchFunction?: (query: string) => Promise<T[]>;
  filters?: CustomFilter[]
};

export default function DataTable<T>({
  className = '',
  title,
  headers,
  columns,
  data,
  searchable = false,
  searchFunction,
  filters = []
}: DataTableProps<T>)
{
  const [search, setSearch] = useState("");

  const [filteredData, setFilteredData] = useState<T[]>([]);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  /**
   * Handles local search or callback search if searchFunction is provided
   */
  async function searchHandler(query: string): Promise<void>
  {
    if (searchFunction) {

      if (!query) {
        alert("No parameter provided for search");
        return;
      }
      searchFunction(query)
        .then((result: any) => {
          setFilteredData(result);
        })
        .catch((error: any) => {
          alert(error.message);
        });

    } else {
      const localResults = data.filter((row) =>
        columns.some((col) =>
          String(row[col]).toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredData(localResults);
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      {searchable && (
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search by ${String(columns[0])}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHandler(search);
              }
            }}
          />
          <button onClick={() => searchHandler(search)}>🔍</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {headers.map((header, i) => {
              const Filter = filters.find(f => f.header === header);
              return (
                <th className={className} key={i}>{header}<b></b>{Filter?.element}</th>
            )})}
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col, i) => (
                <td key={i}>{String(row[col])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}