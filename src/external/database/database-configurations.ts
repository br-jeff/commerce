import { join } from "path";
import settings from "../config/settings";
import knex, { Knex } from "knex";
import { knexSnakeCaseMappers, KnexMappers, Identity, initialize } from "objection";

type connection = & Knex.PgConnectionConfig & {
    entities: string[]
    migrations: string[]
    migrationsTableName: string
}

type KnexConfigurations = {
    database: 'pg' | 'sqlite'
    debug: boolean
    connection: connection
    pool: {
        idleTimeoutMillis: number
        min: number
        max: number
    }
    wrapIdentifier(identifier: string, origWrap: Identity<string>): string
    postProcessResponse(response: any): any;
}

export class DatabaseConfigurations {
    private readonly knexConfigurations: KnexConfigurations
    private knex: Knex
    constructor() {
        const { postProcessResponse, wrapIdentifier } = knexSnakeCaseMappers() as KnexMappers
        this.knexConfigurations = {
            database: 'pg',
            debug: false,
            connection: {
                host: settings.HOST,
                port: 3306,
                user: settings.DATABASE_USER,
                password: settings.DATABASE_PASSWORD,
                database: settings.DATABASE_NAME,
                entities: [join(__dirname, './models/*')],
                migrations: [join(__dirname, './migrations/*')],
                migrationsTableName: "custom_migration_table",
            },
            pool: {
                idleTimeoutMillis: 35000,
                min: 0,
                max: 2,
            },
            postProcessResponse,
            wrapIdentifier
        }
    }

    connection() {
        this.knex = knex(this.knexConfigurations)
        return this.knex
    }

    async migrate() {
        console.info('Running Migrations')
        const migrated = await this.knex?.migrate.latest()
        if (!migrated.length) {
            console.info('There are no migrations to running')
        }
    }

    async seed() {
        console.info('Running Migrations')
        const seeded = await this.knex.seed.run()
        if (!seeded.length) {
            console.info('There are no seeds to running')
        }
    }

    async rollback() {
        console.info('Running Migrations')
        const rollbacked = await this.knex.migrate.rollback()
        if (!rollbacked.length) {
            console.info('There are no roolback to running')
        }
    }
}