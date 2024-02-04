import { OrderModel } from '../models/order'
import { OrderEntity } from '../../../domain/entities/order'
import { DefaultCreateUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'
import { Transaction } from 'objection'
import { FilterOrderType } from '../../../application/types/filter-order-use-case'

export class OrderRepository {
    async insert({ data, trx }: DefaultCreateUseCaseType<OrderEntity>) {
        return OrderModel
            .query(trx)
            .insertAndFetch(data)
    }

    async deleteById({ id, trx }: { id: string, trx?: Transaction }) {
        return OrderModel
            .query(trx)
            .deleteById(id)
    }

    async list({ filters, pagination, trx }: DefaultListUseCaseType<FilterOrderType>) {
        const { page, size } = pagination
        return OrderModel
            .query(trx)
            .modify((builder) => {
                builder.page(page - 1, size)
            })
        // .where(filters)
    }
}