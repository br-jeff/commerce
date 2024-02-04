import { CategoryEntity } from "./category"
import { DiscountEntity } from "./discount"
import { InventoryEntity } from "./inventory"

export class ProductEntity {
    id: string

    name: string

    descr: string

    categoryId: string

    inventoryId: string

    price: number

    sku: string

    discountId?: string

    createdAt: string

    updatedAt?: string

    deletedAt?: string

    category?: CategoryEntity

    inventory?: InventoryEntity

    discount?: DiscountEntity
}