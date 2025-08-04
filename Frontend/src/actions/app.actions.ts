import axios from "axios";
import { type FetchDashboardDataResponse } from "@/types/api";
import { type FetchMovieWinnersByYear } from "@/types/api";
import { type Movie } from "@/types/movie";
import { FetchMoviesResponse } from "@/types/api";

export async function getDashboardData(): Promise<FetchDashboardDataResponse>
{

  return new Promise((resolve, reject) => {
    axios.get('/api/movies')
      .then(response => resolve(response.data))
      .catch(error   => reject(new Error(error.response.data.error)));
  });

}

export async function FetchMovieWinnersByYear(movie: string): Promise<FetchMovieWinnersByYear>
{
  return new Promise((resolve, reject) => {
    axios
      .get("/api/movieWinnersByYear", {
        params: { query: movie },
      })
      .then((response) => resolve(response.data))
      .catch((error)   => reject(new Error(error.response.data.error)));
  });
}

export async function fetchMovies(params: {
  page: number;
  winner: string;
  year: number;
}): Promise<FetchMoviesResponse>
{
  return new Promise((resolve, reject) => {
    axios
      .get("/api/movies/all", {
        params: {
          page: params.page,
          winner: params.winner,
          year: params.year,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(new Error(error.response.data.error)));
  });
}
