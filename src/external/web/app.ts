import 'reflect-metadata';
import express from 'express';
import { container } from 'tsyringe';
import { useContainer } from 'routing-controllers';
import { TsyringeAdapter } from '../config/container';
import settings from '../config/settings';
import { setupControllers } from './controllers';
import { setupSwagger } from './swagger';
import { logger } from '../utils/logger';

const app = express()
setupControllers(app)
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
useContainer(new TsyringeAdapter(container))

/* setupSwagger(app) */

app.on('error', (error) => logger.error({ error }))

app.listen(settings.PORT, () => {
  console.log(`App is running on port ${settings.PORT}`);
});


