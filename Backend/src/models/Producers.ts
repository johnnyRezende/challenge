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
import { MovieProducer } from './MovieProducer';

@Table({tableName: 'producers', timestamps: false})
export class Producers extends Model<Producers>
{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Movie, () => MovieProducer)
  movies!: Movie[];
}