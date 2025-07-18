import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Movie } from './Movie';
import { Studios } from './Studios';

@Table({ tableName: 'movie_studios', timestamps: false })

export class MovieStudio extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => Studios)
  @Column
  studioId!: number;
}
