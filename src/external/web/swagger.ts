import fs from 'fs'
import path from 'path'

import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { Express, Request } from 'express'
import _ from 'lodash'
import {
    getMetadataArgsStorage,
} from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import {
    serve,
    setup,
} from 'swagger-ui-express'
import YAML from 'yaml'
import { container } from 'tsyringe'
import { UserRepository } from '../database/repository/user'
import { sign } from 'jsonwebtoken'
import settings from '../config/settings'
import { logger } from '../utils/logger'
export async function setupSwagger(
    app: Express,
) {
    const storage = getMetadataArgsStorage()
    const schemas = validationMetadatasToSchemas({
        refPointerPrefix: '#/components/schemas/',
    })

    const spec = routingControllersToSpec(storage, undefined, {
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Development',
            },
        ],
        components: {
            schemas: _(schemas)
                .toPairs()
                .orderBy(([key]) => {
                    return [key.endsWith('Schema'), key]
                })
                .fromPairs()
                .value() as any,
            securitySchemes: {
                bearerAuth: {
                    scheme: 'bearer',
                    type: 'http',
                },
            },
        },
        info: {
            title: 'ECCOMERCE API',
            description: 'This project is amateur eccommerce',
            version: '1.0.0',
        },
    })

    fs.writeFileSync(path.resolve('swagger.yml'), YAML.stringify(spec))

    const user = await getUser()

    const serveInstance = setup(spec, {
        swaggerOptions: {
            persistAuthorization: true,
            authToken: user ? getAuthIntecepetor({ id: user.id, username: user.username }) : '',
            requestInterceptor: (request: Request) => {
                if(user) {
                    request.headers.Authorization = `Bearer ${(window as any).ui.getConfigs().authToken}`
                    return request
                }
            },
        },
    })

    app.use(`/docs`, serve)
    app.get(`/docs`, serveInstance)
}

function getAuthIntecepetor(payload: { id: string, username: string }) {
    return sign(
        payload,
        settings.ACESS_TOKEN_SECRET,
        {
            expiresIn: '20m'
        }
    )
}


async function getUser() {
    try {
        const userRepository = container.resolve(UserRepository)
        const user = await userRepository.findById({ id: '8d887c80-4ddb-4ae1-9c3b-b2d11bda884e' })
        return user
    } catch(err) {
        logger.error('error get user from swagger')
        return null
    }
}