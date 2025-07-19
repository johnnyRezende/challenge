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
  const file: NonSharedBuffer = readFileSync('./src/database/movies.csv');

  const records: MovieCSVRow[] = parse(file, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of records) {

    const title = row.title.trim();
    const year = parseInt(row.year);
    const winner = row.winner === 'true'

    // Extract studio names. My CSV data contains 1 or 2 studios
    const studios = [row['studios/0'], row['studios/1']].filter(Boolean).map(s => s.trim());

    // Extract producer names. My CSV base data contains 4 producers per movie at max
    const producers = [
      row['producers/0'], row['producers/1'], row['producers/2'],
      row['producers/3'], row['producers/4']
    ].filter(Boolean).map(p => p.trim());

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