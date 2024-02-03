import { Action, useExpressServer } from 'routing-controllers';
import { Express } from 'express'
import path from 'path';
import fs from 'fs';
import { container } from 'tsyringe';
import { JWTProvider } from '../../domain/providers/jwt-provider';
import { UserRepository } from '../database/repository/user';

export function setupControllers(app: Express) {
    useExpressServer(app, { controllers: getControllers(), authorizationChecker, currentUserChecker })
}

function getControllers() {
    const controllerPath = path.resolve(__dirname, '../../controllers');
    const controllers = fs.readdirSync(controllerPath).map((fileName) =>
        `${controllerPath}/${fileName}`
    );

    return controllers
}

async function authorizationChecker(action: Action, _: string[]) {
    try {
        const tokenProvider = container.resolve(JWTProvider)
        const token = action.request.headers.authorization.split(' ')[1]
        const isValid = tokenProvider.verifyToken(token)
        return !!isValid
    } catch (err) {
        return false
    }
}

async function currentUserChecker(action: Action) {
    try {
        const tokenProvider = container.resolve(JWTProvider)
        const token = action.request.headers.authorization.split(' ')[1]
        const tokenData = tokenProvider.verifyToken(token)
        const userId = tokenData.user.id
        return container.resolve(UserRepository).findById({ id: userId })
    } catch (err) {
        return null
    }
}