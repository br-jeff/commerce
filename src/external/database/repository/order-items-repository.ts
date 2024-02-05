import { DefaultCreateUseCaseType } from '../../../application/types/default-use-case';
import { Transaction } from 'objection';
import { OrderItemsModel } from '../models/order-items';

export class OrderItemsRepository {
    async insert({ data, trx }: DefaultCreateUseCaseType<OrderItemsModel[] | OrderItemsModel>) {
        return OrderItemsModel
            .query(trx)
            .insertAndFetch(data);
    }

    async deleteProductById({ id, trx }: { id: string; trx?: Transaction; }) {
        return OrderItemsModel
            .query(trx)
            .deleteById(id);
    }
}
