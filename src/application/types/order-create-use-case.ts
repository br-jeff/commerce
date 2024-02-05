import { UserEntity } from "../../domain/entities/user"
import { CreateOrderItemsType } from "./create-order-items-type"
import { CreateUserPaymentType } from "./create-user-payment-type"

export type CreateOrderType = {
    usersPayments: CreateUserPaymentType
    orderItems: CreateOrderItemsType[]
    user: UserEntity
}