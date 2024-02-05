export class UserPaymentEntity {
    id: string

    userId: string

    paymentType: string

    provider: string

    accountNo: number

    expiry: string

    createdAt: Date

    deletedAt: Date
}