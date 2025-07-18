import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  Unique,
  BelongsToMany,
  Comment,
} from 'sequelize-typescript';
import { Movie } from './Movie';

import { MovieStudio } from './MovieStudio';

@Table({tableName: 'studios', timestamps: false })
export class Studios extends Model<Studios> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Movie, () => MovieStudio)
  movies!: Movie[];
}