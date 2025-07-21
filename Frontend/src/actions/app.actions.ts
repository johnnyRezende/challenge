import axios from "axios";
import { type DashboardData } from "@/types/api";
import { type fetchMovieWinnersByYear } from "@/types/api";
import { type Movie } from "@/types/movie";
export async function getDashboardData(): Promise<DashboardData>
{

  return new Promise((resolve, reject) => {
    axios.get('/api/movies')
      .then(response => resolve(response.data))
      .catch(error   => reject(new Error(error.response.data.error)));
  });

}

export async function fetchMovieWinnersByYear(movie: string): Promise<fetchMovieWinnersByYear>
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

export async function fetchAllMovies(): Promise<Movie[]>
{
    return new Promise((resolve, reject) => {
      axios
        .get("/api/movies/all")
        .then((response) => resolve(response.data))
        .catch((error)   => reject(new Error(error.response.data.error)));
    });
}
