export class UserPaymentEntity {
    id: string

    userId: string

    payment_type: string

    provider: string

    account_no: number

    expiry: Date

    createdAt: Date

    deletedAt: Date
}