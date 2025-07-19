import { Sequelize } from 'sequelize-typescript';

import {Movie} from '../models/Movie'
import {Studios} from '../models/Studios'
import {Producers} from '../models/Producers'
import {MovieProducer} from '../models/MovieProducer'
import {MovieStudio} from '../models/MovieStudio'


export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  models: [Movie, Studios, Producers, MovieProducer, MovieStudio],
});