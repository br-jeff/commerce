import { ProductModel } from '../models/product'
import { ProductEntity } from '../../../domain/entities/product'
import { FilterProductType } from '../../../application/types/filter-product-use-case'
import { DefaultCreateUseCaseType, DefaultListUseCaseType, GenericUseCaseType } from '../../../application/types/default-use-case'
import { QueryBuilder, Transaction, Modifier } from 'objection'

type Filters = {
    builder: QueryBuilder<ProductModel, ProductModel[]>,
    productIds: string[]
}

export class ProductRepository {

    private defaultFilters({ builder, productIds }: Filters) {
        if (productIds) {
            builder.whereIn('products.id', productIds)
        }
    }

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

    async availables({ data, trx }: GenericUseCaseType<{ ids: string[] }>) {
        const { ids } = data
        return ProductModel
            .query(trx)
            .withGraphFetched('[inventory]')
            .modify((builder) => this.defaultFilters({ builder, productIds: ids }))
            .whereIn('id', data.ids)
    }

}