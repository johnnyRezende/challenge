import { Producer } from "./producer"

export type Studio = string

export type Movie = {
  id: string,
  year: number,
  title: string,
  studios: Studio[],
  producers: Producer[],
  winner: string
}
