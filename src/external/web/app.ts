import 'reflect-metadata';
import express from 'express';
import settings from '../config/settings';
import { useContainer } from 'class-validator';
import { TsyringeAdapter } from '../config/container';
import { container } from 'tsyringe';
import { databaseStartup } from '../handlers/database-startup';
import { logger } from '../utils/logger';
import { setupControllers } from './controllers';

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

useContainer(new TsyringeAdapter(container))
setupControllers(app)
databaseStartup()

app.on('error', (error) => logger.error({ error }))
app.listen(settings.PORT, () => {
  console.log(`App is running on port ${settings.PORT}`);
});
