import { DefaultCreateUseCaseType } from '../../../application/types/default-use-case'
import { Transaction } from 'objection'
import { PaymentModel } from '../models/payment'
import { PaymentEntity } from '../../../domain/entities/payments'

export class PaymentRepository {
    async insert({ data, trx }: DefaultCreateUseCaseType<PaymentEntity>) {
        return PaymentModel
            .query(trx)
            .insertAndFetch(data)
    }

    async deleteProductById({ id, trx }: { id: string, trx?: Transaction }) {
        return PaymentModel
            .query(trx)
            .deleteById(id)
    }
}