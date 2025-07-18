import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BelongsToMany,
  AllowNull,
  Comment,
} from 'sequelize-typescript';

import { Studios } from './Studios';
import { Producers } from './Producers';
import { MovieStudio } from './MovieStudio';
import { MovieProducer } from './MovieProducer';

@Table({tableName: 'movies', timestamps: true})
export class Movie extends Model<Movie> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  year!: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  winner!: boolean;

  // Associations
  @BelongsToMany(() => Studios, () => MovieStudio, 'movieId', 'studioId')
  studios!: Studios[];

  @BelongsToMany(() => Producers, () => MovieProducer, 'movieId', 'producerId')
  producers!: Producers[];
}