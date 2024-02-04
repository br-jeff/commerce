import { Knex } from 'knex'

const tableName = 'payments'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary()
        table
            .uuid('order_id')
            .references('orders.id')
            .notNullable()
            .index()

        table.integer('amount').notNullable()
        table.string('provider').notNullable()
        table.string('status').notNullable()
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

