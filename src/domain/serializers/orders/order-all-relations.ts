import { Exclude, Expose, Type } from 'class-transformer'
import { ArrayMinSize, IsDefined, IsNotEmptyObject, IsNumber, IsObject, IsString, IsUUID, ValidateNested } from 'class-validator'
import { UserSerializer } from '../user'
import { UserEntity } from '../../entities/user'
import { PaymentSerializer } from '../payment'
import { OrderItemsEntity } from '../../entities/order-items'
import { OrderItemsSerializer } from '../order-items'

export class ListOrdersSerializer {
    @ValidateNested()
    @Type(() => OrderSerializer)
    @Expose()
    results: Partial<OrderItemsEntity>[]

    @Expose()
    @IsNumber()
    total: number
}

export class OrderSerializer {
    @Expose()
    @IsUUID()
    id: string

    @Expose()
    @IsNumber()
    total: number

    @Expose()
    @IsString()
    createdAt: Date

    @Expose()
    @IsString()
    updatedAt: Date

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => UserSerializer)
    @Expose()
    user: Partial<UserEntity>

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => PaymentSerializer)
    @Expose()
    payment: Partial<PaymentSerializer>

    @ValidateNested()
    @Type(() => OrderItemsSerializer)
    @Expose()
    orderItems: Partial<OrderItemsEntity>[]
}
