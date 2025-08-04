
import type { Producer } from "./movie";
import type { Movie } from "./movie";
import type { StudioWinCount } from "./studios";

export type DashboardData = {
  minMaxInterval: {
    min: winRange[];
    max: winRange[];
  };
  multipleWinners: {
    year: number;
    winnerCount: number;
  }[];
  topThreeStudios: StudioWinCount[];
};


// Endpoints

export type FetchDashboardDataResponse = DashboardData

export type FetchMoviesResponse = {
  content: Movie[],
  totalElements: number,
  totalPages: number,
  pageNumber: number
}

export type StudiosApiResponse = {
  studios: StudioWinCount[];
};

export type FetchMovieWinnersByYear = {
  id: number,
  title: string;
  year: number;
}[]

