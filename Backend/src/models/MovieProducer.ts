import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Movie } from './Movie';
import { Producers } from './Producers';

@Table({ tableName: 'movie_producers', timestamps: false })

export class MovieProducer extends Model {
  @ForeignKey(() => Movie)
  @Column
  movieId!: number;

  @ForeignKey(() => Producers)
  @Column
  producerId!: number;
}