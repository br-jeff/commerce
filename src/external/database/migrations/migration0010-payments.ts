

import { Knex } from 'knex'

const tableName = 'payments'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table
            .uuid('order_id')
            .references('orders.id')
            .notNullable()
            .onDelete('CASCADE')
            .index()

    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(tableName)
}

