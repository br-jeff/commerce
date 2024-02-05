import { Knex } from 'knex'

const tableName = 'products'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary()
        table.string('name').notNullable()
        table.string('sku').notNullable()
        table.text('descr').notNullable()
        table.decimal('price')
        table
            .uuid('category_id')
            .references('products_category.id')
            .notNullable()
            .onDelete('CASCADE')
            .index()
        table
            .uuid('inventory_id')
            .references('products_inventories.id')
            .notNullable()
            .onDelete('CASCADE')
            .index()
        table.uuid('discount_id')
            .references('discounts.id')
            .nullable()
            .onDelete('CASCADE')
            .index()
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

