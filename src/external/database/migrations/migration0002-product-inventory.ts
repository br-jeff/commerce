import { Knex } from 'knex'

const tableName = 'products_inventories'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary()
        table.integer('quantity').defaultTo(0)
        table.timestamps({
            defaultToNow: true,
            useCamelCase: false,
            useTimestamps: true,
        })
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tableName)
}

