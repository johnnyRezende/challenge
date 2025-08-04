export type Producer = string

export type winRange = {
  producer: Producer,
  interval: number,
  followingWin: number,
  previousWin: number
}
