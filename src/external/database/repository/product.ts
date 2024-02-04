import { ProductModel } from '../models/product'
import { ProductEntity } from '../../../domain/entities/product'
import { FilterProductType } from '../../../application/types/filter-product-use-case'
import { DefaultCreateUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'
import { Transaction } from 'objection'

export class ProductRepository {
    async insertProduct({ data, trx }: DefaultCreateUseCaseType<ProductEntity>) {
        return ProductModel
            .query(trx)
            .insertAndFetch(data)
    }

    async deleteProductById({ id, trx }: { id: string, trx?: Transaction }) {
        return ProductModel
            .query(trx)
            .deleteById(id)
    }

    async list({ filters, pagination, trx }: DefaultListUseCaseType<FilterProductType>) {
        const { page, size } = pagination
        return ProductModel
            .query(trx)
            .modify((builder) => {
                builder.page(page - 1, size)
            })
        // .where(filters)
    }
}