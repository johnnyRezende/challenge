'use client'
import React from 'react';
import DataTable                   from "@/components/DataTable";
import { useEffect, useState }     from "react";
import { fetchMovieWinnersByYear } from "@/actions/app.actions";
import { getDashboardData }        from "@/actions/app.actions";

export default function Dashboard()
{

  const [minMaxInterval, setMinMaxInterval]   = useState({min: [], max: []})
  const [multipleWinners, setMultipleWinners] = useState([])
  const [topThreeStudios, setTopThreeStudios] = useState([])

  useEffect(() => {
    getDashboardData().then((result: any) =>
    {
      setMinMaxInterval(result.minMaxInterval)
      setMultipleWinners(result.multipleWinners)
      setTopThreeStudios(result.topThreeStudios)

    }).catch((error) => {
      alert(error.message)
    })

  }, [])

  return (
    <>
      <div className="two-column-grid">
        <div className="grid-item">
          <DataTable
            title="List years with multiple winners"
            headers={["Year", "Win Count"]}
            columns={["year", "winnerCount"]}
            data={multipleWinners}
          />
        </div>

        <div className="grid-item">
          <DataTable
            title="Top 3 studios with winners"
            headers={["name", "Win Count"]}
            columns={["name", "winCount"]}
            data={topThreeStudios}
          />
        </div>

        <div className="grid-item">
          <h3>Producers with longest and shortest interval between wins</h3>
          <DataTable
            title="Maximum"
            headers={["Producer", "Interval", "Previous Year", "Following Year"]}
            columns={["producer", "interval", "previousWin", "followingWin"]}
            data={minMaxInterval.max}
          />
          <DataTable
            title="Minimum"
            headers={["Producer", "Interval", "Previous Year", "Following Year"]}
            columns={["producer", "interval", "previousWin", "followingWin"]}
            data={minMaxInterval.min}
          />
        </div>
        <div className="grid-item">
          <DataTable
            title="List movie winners by year"
            headers={["ID", "Year", "Title"]}
            columns={["id", "year", "title",]}
            data={[]}
            searchable={true}
            searchFunction={fetchMovieWinnersByYear}
          />
        </div>
      </div>
    </>
  );
}
