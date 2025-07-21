import { Producer } from "./movie";

export type DashboardData = {
  minMaxInterval: {
    min: Producer[];
    max: Producer[];
  };
  multipleWinners: {
    year: number;
    winnerCount: number;
  }[];
  topThreeStudios: {
    name: string;
    winCount: number;
  }[];
};

export type fetchMovieWinnersByYear = {
  id: number,
  title: string;
  year: number;
}[]

