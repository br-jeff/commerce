export type CreateUserPaymentType = {
    paymentType: string
    provider: string
    accountNo: number
    expiry: string
    userAddressId: string
}