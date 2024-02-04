import { container } from 'tsyringe'

import { startDb } from '../../../../test/setup/teste-db'
import { ListProductUseCase } from './list-product-use-case'

import { createInventory } from '../../../../test/fixtures/create-inventory'

import { DiscountModel } from '../../../external/database/models/discount'
import { InventoryModel } from '../../../external/database/models/inventory'
import { createDiscount } from '../../../../test/fixtures/create-discounts'
import { createProduct } from '../../../../test/fixtures/create-product'

describe('ListProductUseCase', () => {
    test('Should list product', async () => {
        const knex = await startDb()
        const sut = container.resolve(ListProductUseCase)
        const discount = createDiscount()
        await DiscountModel.query().insert(discount)
        const inventory = createInventory()
        await InventoryModel.query().insert(inventory)

        const products = [
            createProduct({ discountId: discount.id, inventoryId: inventory.id }),
            createProduct({ discountId: discount.id, inventoryId: inventory.id }),
            createProduct({ discountId: discount.id, inventoryId: inventory.id }),
        ]
        await knex('products').insert(products)

        const result = await sut.execute({ pagination: { page: 1, size: 3 } })

        expect(result).toEqual('users')
    })
})
