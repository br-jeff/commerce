import { Knex } from 'knex'

const tableName = 'order_items'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary()
        table
            .uuid('order_id')
            .references('orders.id')
            .notNullable()
            .index()
        table
            .uuid('product_id')
            .references('products.id')
            .notNullable()
            .index()
        table.integer('quantity').notNullable()
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

