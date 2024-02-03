import { Action, useExpressServer } from 'routing-controllers';
import { Express } from 'express'
import path from 'path';
import fs from 'fs';
import { container } from 'tsyringe';
import { JWTProvider } from '../../domain/providers/jwt-provider';

export function setupControllers(app: Express) {
    useExpressServer(app, { controllers: getControllers(), authorizationChecker: authDecorator })
}

function getControllers() {
    const controllerPath = path.resolve(__dirname, '../../controllers');
    const controllers = fs.readdirSync(controllerPath).map((fileName) =>
        `${controllerPath}/${fileName}`
    );

    return controllers
}

async function authDecorator(action: Action, _: string[]) {
    const token = action.request.headers.authorization
    const tokenProvider = container.resolve(JWTProvider)
    try {
        const isValid = tokenProvider.verifyToken(token)
        return !!isValid
    } catch (err) {
        return false
    }
}
