import { IsNumber, IsString, IsUUID } from "class-validator"

export class CreateProductSchema {
    @IsString()
    name: string

    @IsString()
    descr: string

    @IsUUID()
    categoryId: string

    @IsUUID()
    inventoryId: string

    @IsNumber()
    price: number

    @IsString()
    sku: string

    @IsUUID()
    discountId: string
}