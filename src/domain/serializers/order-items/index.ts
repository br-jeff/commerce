import { Exclude, Expose } from 'class-transformer'
import { IsNumber, IsUUID } from 'class-validator'

@Exclude()
export class OrderItemsSerializer {
    @Expose()
    @IsUUID()
    id: string

    @Expose()
    @IsUUID()
    orderId: string

    @Expose()
    @IsUUID()
    productId: string

    @Expose()
    @IsNumber()
    quantity: number

    createdAt: Date

    updatedAt: Date
}
