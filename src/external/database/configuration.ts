import { join } from "path";
import settings from "../config/settings";
import knex, { Knex } from "knex";
import { knexSnakeCaseMappers, KnexMappers, Identity, Model } from "objection";
import { injectable } from "tsyringe";
import { logger } from "../utils/logger";

type KnexConfigurations = {
    client: 'postgres' | 'sqlite3'
    debug: boolean
    connection: Knex.PgConnectionConfig
    pool: {
        idleTimeoutMillis: number
        min: number
        max: number
    }
    entities: { directory: string[] },
    migrations: { directory: string[] }
    seeds?: { directory: string[] }
    wrapIdentifier?(identifier: string, origWrap: Identity<string>): string
    postProcessResponse?(response: any): any;
}

@injectable()
export class DatabaseConfiguration {
    private readonly knexConfigurations: KnexConfigurations
    private knex: Knex
    constructor() {
        const { postProcessResponse, wrapIdentifier } = knexSnakeCaseMappers() as KnexMappers
        this.knexConfigurations = {
            client: settings.database.DRIVER,
            debug: false,
            connection: {
                host: settings.database.HOST,
                port: settings.database.PORT,
                user: settings.database.USER,
                password: settings.database.PASSWORD,
                database: settings.database.DB_NAME,
            },
            entities: { directory: [join(__dirname, './models')] },
            migrations: {
                directory: [join(__dirname, './migrations')]
            },
            seeds: {
                directory: [join(__dirname, './seeds')]
            },
            pool: {
                idleTimeoutMillis: 35000,
                min: 0,
                max: 20,
            },
            postProcessResponse,
            wrapIdentifier
        }
        this.setGlobal()
    }

    private setGlobal() {
        this.knex = knex(this.knexConfigurations)
        Model.knex(this.knex)
    }

    async migrate() {
        logger.info('Running Migrations')
        await this.knex.migrate.latest()
        logger.info("Migrations were successful!");
    }

    async seed() {
        try {
            const admin = await this.knex.from('users').where({ username: 'admin' })
            if(!admin.length) {
                logger.info('Running Seeds')
                await this.knex.seed.run()
                logger.info('Seeds were successful!');
            }
        } catch(err) {
            logger.error(`Error on seeds: ${err} `)
        }
    }

    async rollback() {
        logger.info('Running Rollback')
        await this.knex.migrate.rollback()
        logger.info('Rollback were successful!');
    }
}