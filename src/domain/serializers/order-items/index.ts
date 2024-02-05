import { Exclude, Expose, Type } from 'class-transformer'
import { IsDefined, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator'
import { ProductEntity } from '../../entities/product'
import { ProductRelationsSerializer } from '../product/product-relations'

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

    @IsDefined()
    @IsObject()
    @ValidateNested()
    @Type(() => ProductRelationsSerializer)
    @Expose()
    product: Partial<ProductEntity>
}
