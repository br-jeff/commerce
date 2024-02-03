import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
import { useContainer } from 'routing-controllers';
import { TsyringeAdapter } from '../config/container';
import { setupControllers } from './controllers';
import { setupSwagger } from './swagger';
import { logger } from '../utils/logger';
import databaseStart from '../database/startup'
import settings from '../config/settings';

const app = express()
setupControllers(app)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
useContainer(new TsyringeAdapter(container))

databaseStart().then(() => setupSwagger(app))

app.on('error', (error) => logger.error({ error }))

app.listen(settings.PORT, async () => {
  logger.info(`App is running on port ${settings.PORT}`);
});
