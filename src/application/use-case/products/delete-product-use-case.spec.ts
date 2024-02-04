import { container } from 'tsyringe'

import { startDb } from '../../../../test/setup/teste-db'
import { DeleteProductUseCase } from './delete-product-use-case'

import { createInventory } from '../../../../test/fixtures/create-inventory'

import { DiscountModel } from '../../../external/database/models/discount'
import { InventoryModel } from '../../../external/database/models/inventory'
import { createDiscount } from '../../../../test/fixtures/create-discounts'
import { createProduct } from '../../../../test/fixtures/create-product'
import { createUser } from '../../../../test/fixtures/create-user'
import { BadRequestError, NotFoundError } from 'routing-controllers'

describe('DeleteProductUseCase', () => {
    test('Should delete product', async () => {
        const knex = await startDb()
        const sut = container.resolve(DeleteProductUseCase)

        const admin = createUser({ username: 'admin' })
        await knex('users').insert(admin)
        const discount = createDiscount()
        await DiscountModel.query().insert(discount)
        const inventory = createInventory()
        await InventoryModel.query().insert(inventory)


        const product = createProduct({ discountId: discount.id, inventoryId: inventory.id })
        await knex('products').insert(product)


        const result = await sut.execute({ data: { id: product.id, user: admin } })

        expect(result).toEqual({ "status": "Sucess" })
    })

    test('Should not delete because is not admin', async () => {
        const knex = await startDb()
        const sut = container.resolve(DeleteProductUseCase)
        const notAdmin = createUser({ username: 'not_admin' })
        await knex('users').insert(notAdmin)

        const discount = createDiscount()
        await DiscountModel.query().insert(discount)
        const inventory = createInventory()
        await InventoryModel.query().insert(inventory)

        const user = createUser({ username: 'usuario' })
        await knex('users').insert(user)

        const product = createProduct({ discountId: discount.id, inventoryId: inventory.id })
        await knex('products').insert(product)

        const result = sut.execute({ data: { id: product.id, user: notAdmin } })
        expect(await result).toThrow(BadRequestError)
    })
})
