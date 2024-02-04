

import { Type } from "class-transformer"
import { ArrayMinSize, ArrayNotEmpty, IsArray, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"

export class CreateOrderSchema {
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UsersPaymentsSchema)
    usersPayments: any[]

    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => OrderItemsSchema)
    orderItems: any
}

class OrderItemsSchema {
    @IsString()
    productId: string

    @IsNumber()
    quantity: number
}

class UsersPaymentsSchema {
    @IsString()
    paymentType: string

    @IsString()
    provider: string

    @IsNumber()
    accountNo: number

    @IsString()
    expiry: string
}