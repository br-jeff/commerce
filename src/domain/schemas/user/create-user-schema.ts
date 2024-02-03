import { IsDefined, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator"
import { UserAddressEntity } from "../../../domain/entities/user_address"
import { Type } from "class-transformer"
import { CreatUserAddressSchema } from "../address/create-address-schema"

export class CreateUserSchema {
    @IsString()
    username: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
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
    @Type(() => CreatUserAddressSchema)
    userAddress: UserAddressEntity
}

