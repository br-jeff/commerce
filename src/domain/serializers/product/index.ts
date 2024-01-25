import { Exclude, Expose } from 'class-transformer'
import { IsNumber, IsString, IsUUID } from 'class-validator'

@Exclude()
export class ProductSerializer {
    @Expose()
    @IsUUID()
    id: string

    @Expose()
    @IsString()
    name: string

    @Expose()
    @IsString()
    descr: string

    @Expose()
    @IsUUID()
    categoryId: string

    @Expose()
    @IsUUID()
    inventoryId: string

    @Expose()
    @IsNumber()
    price: number

    @Expose()
    @IsString()
    sku: string

    @Expose()
    @IsNumber()
    discountId: number

    createdAt: Date

    updatedAt: Date
}
