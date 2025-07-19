'use client';

import { useState } from 'react';

type DataTableProps<T> = {
  title: string,
  headers: string[];
  columns: (keyof T)[];
  data: T[];
  searchable?: boolean;
};

export default function DataTable<T>({ title, headers, columns, data, searchable = false }: DataTableProps<T>) {
  const [search, setSearch] = useState('');

  const filteredData = searchable
    ? data.filter((row) =>
        String(row[columns[0]]).toLowerCase().includes(search.toLowerCase())
      )
    : data;

  return (
    <div className="card">
      <h3>{title}</h3>
      {searchable && (
        <div className="search-bar">
          <input
            type="text"
            placeholder={`Search by ${String(columns[0])}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button>🔍</button>
        </div>
      )}

      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, idx) => (
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