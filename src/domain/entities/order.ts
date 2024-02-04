import { UserEntity } from "./user"
import { UserPaymentEntity } from "./user_payment"

export class OrderEntity {
    id: string

    userId: string

    paymentId: string

    total: number

    createdAt: string

    updatedAt?: string

    deletedAt?: string

    user?: UserEntity

    payment?: UserPaymentEntity
}