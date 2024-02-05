import { Exclude, Expose } from 'class-transformer'
import { IsNumber, IsString, IsUUID } from 'class-validator'

@Exclude()
export class PaymentSerializer {
    @Expose()
    @IsUUID()
    id: string

    @Expose()
    @IsNumber()
    amount: number

    @Expose()
    @IsString()
    provider: string

    @Expose()
    @IsString()
    status: string

    createdAt: Date

    updatedAt: Date
}
