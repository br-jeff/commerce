import { DefaultCreateUseCaseType } from '../../../application/types/default-use-case'
import { Transaction } from 'objection'
import { UserPaymentModel } from '../models/user-payment'
import { UserPaymentEntity } from '../../../domain/entities/user_payment'

export class UserPaymentRepository {
    async insert({ data, trx }: DefaultCreateUseCaseType<UserPaymentEntity>) {
        return UserPaymentModel
            .query(trx)
            .insertAndFetch(data)
    }

    async deleteProductById({ id, trx }: { id: string, trx?: Transaction }) {
        return UserPaymentModel
            .query(trx)
            .deleteById(id)
    }
}