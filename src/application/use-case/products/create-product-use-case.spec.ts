import { container } from 'tsyringe'

import { startDb } from '../../../../test/setup/teste-db'
import { CreateProductUseCase } from './create-product-use-case'

import { createInventory } from '../../../../test/fixtures/create-inventory'

import { DiscountModel } from '../../../external/database/models/discount'
import { InventoryModel } from '../../../external/database/models/inventory'
import { createDiscount } from '../../../../test/fixtures/create-discounts'
import { createProduct } from '../../../../test/fixtures/create-product'
import { createUser } from '../../../../test/fixtures/create-user'
import { NotFoundError } from 'routing-controllers'

describe('CreateProductUseCase', () => {
    test('Should create product', async () => {
        const knex = await startDb()
        const sut = container.resolve(CreateProductUseCase)
        const admin = createUser({ username: 'admin' })
        await knex('users').insert(admin)
        const discount = createDiscount()
        await DiscountModel.query().insert(discount)
        const inventory = createInventory()
        await InventoryModel.query().insert(inventory)

        const data = createProduct({ discountId: discount.id, inventoryId: inventory.id })
        const result = await sut.execute({ data, user: admin })

        expect(result).toEqual(data)
    })

    test('Should not create because is not admin', async () => {
        const knex = await startDb()
        const sut = container.resolve(CreateProductUseCase)
        const admin = createUser({ username: 'admin' })
        await knex('users').insert(admin)

        const discount = createDiscount()
        await DiscountModel.query().insert(discount)
        const inventory = createInventory()
        await InventoryModel.query().insert(inventory)

        const user = createUser({ username: 'usuario' })
        await knex('users').insert(user)


        const data = createProduct({ discountId: discount.id, inventoryId: inventory.id })
        const result = await sut.execute({ data, user })

        expect(result).toThrow(NotFoundError)
    })
})
