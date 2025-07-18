import express             from 'express';
import { sequelize }       from './config/database';
import { producersRouter } from './routes/producers.router';
import { up }              from './database/seed';


const app = express();

app.get('/health/ping', async function (req, res) {
    res.statusCode = 200;
    res.send({ status: 200 });
});

app.use('/producers', producersRouter)

async function startDB(): Promise<void>
{
  await sequelize.sync({ force: true });
  await sequelize.authenticate()
  console.log('Database connected')

  console.log("\nSeeding database...\n")
  await up()
}

export { app, startDB };
