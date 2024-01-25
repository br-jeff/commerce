import { useExpressServer } from 'routing-controllers';
import { Express } from 'express'
import path from 'path';
import fs from 'fs';

export function setupControllers(app: Express) {
    useExpressServer(app, { controllers: getControllers() })
}

function getControllers() {
    const controllerPath = path.resolve(__dirname, '../../controllers');
    console.log({ controllerPath })
    const controllers = fs.readdirSync(controllerPath).map((fileName) =>
        `${controllerPath}/${fileName}`
    );

    return controllers
}