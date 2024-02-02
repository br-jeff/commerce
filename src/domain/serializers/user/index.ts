import { Exclude, Expose, Type } from 'class-transformer'
import { IsDefined, IsNotEmptyObject, IsObject, IsString, IsUUID, ValidateNested } from 'class-validator'
import { UserAddressEntity } from '../../entities/user_address'

@Exclude()
export class UserSerializer {
    @Expose()
    @IsString()
    username: string

    @Expose()
    @IsString()
    firstName: string

    @Expose()
    @IsUUID()
    lastName: string

    @Expose()
    @IsUUID()
    telephone: string

    @Expose()
    @IsString()
    email: string

    createdAt: Date

    updatedAt: Date

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => UserAdressSchema)
    @Expose()
    userAddress: UserAddressEntity
}

class UserAdressSchema {
    @Expose()
    @IsString()
    addressLine1: string

    @Expose()
    @IsString()
    addressLine2: string

    @Expose()
    @IsString()
    city: string

    @Expose()
    @IsString()
    postalCode: string

    @Expose()
    @IsString()
    country: string
}
