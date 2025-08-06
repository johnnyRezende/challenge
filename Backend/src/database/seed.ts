import { Movie } from '../models/Movie';
import { Producers } from '../models/Producers';
import { Studios } from '../models/Studios';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

type MovieCSVRow = {
  id: string;
  year: string;
  title: string;
  'studios/0': string;
  'producers/0': string;
  winner: string;
  'producers/1'?: string;
  'producers/2'?: string;
  'studios/1'?: string;
  'producers/3'?: string;
  'producers/4'?: string;
};

export async function up(): Promise<void>
{
  const file: NonSharedBuffer = readFileSync('./src/database/Movielist.csv');

  const records: any = parse(file, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';'
  });

  for (const row of records) {

    const title = row.title.trim();
    const year = parseInt(row.year);
    const winner = row.winner === 'yes'

    // Extract studio names spliting by comma
    const studios = row["studios"].split(",").map((studio: string) => studio.trim())

    // Extract producer names spliting by 'and' word
    const producers = row["producers"].split("and").map((producer: string) => producer.trim())

    // Find or create studios
    const studioInstances: Studios[] = [];
    for (const name of studios) {
      const [studio] = await Studios.findOrCreate({ where: { name }, defaults: { name } });
      studioInstances.push(studio);
    }

    // Find or create producers
    const producerInstances: Producers[] = [];
    for (const name of producers) {
      const [producer] = await Producers.findOrCreate({ where: { name }, defaults: { name } });
      producerInstances.push(producer);
    }

    // Create movie
    const movie = await Movie.create({ title, year, winner });

    // Set associations
    await movie.$set('studios', studioInstances);
    await movie.$set('producers', producerInstances);
  }
}

export async function down(): Promise<void> {
  await Movie.destroy({ where: {} });
  await Producers.destroy({ where: {} });
  await Studios.destroy({ where: {} });
}