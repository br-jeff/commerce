import { IsDefined, IsNotEmptyObject, IsObject, IsString, IsUUID, ValidateNested } from "class-validator"
import { UserAddressEntity } from "../../../domain/entities/user_address"
import { Type } from "class-transformer"

export class CreateUserSchema {
    @IsString()
    username: string

    @IsString()
    firstName: string

    @IsUUID()
    lastName: string

    @IsUUID()
    password: string

    @IsString()
    telephone: string

    @IsString()
    mobile: string

    @IsString()
    email: string

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => UserAdressSchema)
    userAddress: UserAddressEntity
}

class UserAdressSchema {
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
