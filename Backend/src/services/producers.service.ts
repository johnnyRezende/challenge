import { Producers } from '../models/Producers';
import { Movie }     from '../models/Movie';

export type AwardInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

/**
 * Obtain the producer with the longest interval between two consecutive awards,
 * and the one who obtained two awards the fastest
 * 
 * @returns {max: AwardInterval[]; min: AwardInterval[]}
 */
export async function fetchAwardInterval(): Promise<{ max: AwardInterval[]; min: AwardInterval[]}>
{
  const producers = await Producers.findAll({
    include: [{
      model: Movie,
      as: 'movies',
      where: { winner: true },
      attributes: ['year'],
      through: { attributes: [] },
    }],
  });

  const intervals: {
    producer:     string;
    interval:     number;
    previousWin:  number;
    followingWin: number;
  }[] = [];

  for (const producer of producers) {

    // Sorting years asc
    const years = producer.movies.map(movie => movie.year).sort((a, b) => a - b);

    if (years.length < 2) continue;

    // Setting up intervals between years
    for (let i = 1; i < years.length; i++) {
      const previous = years[i - 1];
      const current = years[i];
      intervals.push({
        producer: producer.name,
        interval: current - previous,
        previousWin: previous,
        followingWin: current,
      });
    }
  }

  // Finding max and min intervals
  const maxInterval = intervals?.reduce((a, b) => (a.interval > b.interval ? a : b)).interval;
  const minInterval = intervals?.reduce((a, b) => (a.interval < b.interval ? a : b)).interval;

  // Getting all producers winners with the same max and min intervals
  const maxProducers = intervals?.filter(i => i.interval === maxInterval);
  const minProducers = intervals?.filter(i => i.interval === minInterval);

  return {
    max: maxProducers,
    min: minProducers
  };
}