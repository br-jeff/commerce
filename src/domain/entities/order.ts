import { PaymentEntity } from "./payments"
import { UserEntity } from "./user"

export class OrderEntity {
    id: string

    userId: string

    paymentId: string

    total: number

    createdAt: string

    updatedAt?: string

    deletedAt?: string

    user?: UserEntity

    payment?: PaymentEntity
}