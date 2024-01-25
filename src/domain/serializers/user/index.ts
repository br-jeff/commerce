import { Exclude, Expose } from 'class-transformer'
import { IsString, IsUUID } from 'class-validator'

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
}