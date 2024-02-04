import { Product } from "../../controllers/product"
import { OrderEntity } from "./order"

export class OrderItemsEntity {
    id: string

    orderId: string

    productId: string

    quantity: number

    createdAt: string

    updatedAt?: string

    deletedAt?: string

    product?: Product

    order?: OrderEntity
}