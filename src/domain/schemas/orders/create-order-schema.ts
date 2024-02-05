

import { Type } from "class-transformer"
import { ArrayMinSize, IsNotEmptyObject, IsNumber, IsObject, IsString, IsUUID, ValidateNested } from "class-validator"
import { CreateUserPaymentType } from "../../../application/types/create-user-payment-type"
import { CreateOrderItemsType } from "../../../application/types/create-order-items-type"

export class CreateOrderSchema {
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UserPaymentSchema)
    usersPayments: CreateUserPaymentType

    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => OrderItemsSchema)
    orderItems: CreateOrderItemsType[]
}

class OrderItemsSchema {
    @IsUUID()
    productId: string

    @IsNumber()
    quantity: number
}

class UserPaymentSchema {
    @IsString()
    paymentType: string

    @IsString()
    provider: string

    @IsNumber()
    accountNo: number

    @IsString()
    expiry: string

    @IsUUID()
    userAddressId: string
}
