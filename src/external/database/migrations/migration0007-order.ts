import { Knex } from 'knex'

const tableName = 'orders'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary()
        table
            .uuid('user_id')
            .references('users.id')
            .notNullable()
            .index()

        table
            .uuid('payment_id')
            .references('users_payments.id')
            .notNullable()
            .index()
        table.decimal('total').notNullable()
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

