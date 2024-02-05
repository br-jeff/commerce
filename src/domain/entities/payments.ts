import { OrderEntity } from "./order"

export class PaymentEntity {
    id: string

    amount: number

    provider: string

    status: string

    createdAt?: Date

    deletedAt?: Date
}