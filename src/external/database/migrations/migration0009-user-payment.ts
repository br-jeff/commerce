import { Knex } from 'knex'

const tableName = 'users_payments'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table) => {
        table.uuid('id').primary()
        table
            .uuid('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')
            .index()

        table.string('payment_type').notNullable()
        table.string('provider').notNullable()
        table.string('account_no').notNullable()
        table.string('expiry').notNullable()
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

