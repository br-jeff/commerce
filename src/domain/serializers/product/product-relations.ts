import { Exclude, Expose } from 'class-transformer'
import { IsNumber, IsString, IsUUID } from 'class-validator'

@Exclude()
export class ProductRelationsSerializer {
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
