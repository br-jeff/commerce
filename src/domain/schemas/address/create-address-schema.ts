import { IsString, IsUUID } from "class-validator"

export class CreatUserAddressSchema {
    @IsString()
    addressLine1: string

    @IsString()
    addressLine2: string

    @IsString()
    city: string

    @IsString()
    postalCode: string

    @IsString()
    country: string
}
