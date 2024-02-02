import { ProductModel } from '../models/product'
import { ProductEntity } from '../../../domain/entities/product'
import { FilterProductType } from '../../../application/types/filter-product-use-case'
import { DefaultCreateUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'

export class ProductRepository {
    async insertProduct({ data, trx }: DefaultCreateUseCaseType<ProductEntity>) {
        return ProductModel
            .query(trx)
            .insertAndFetch(data)
    }

    async list({ filters, pagination, trx }: DefaultListUseCaseType<FilterProductType>) {
        const { page, size } = pagination 
        return ProductModel
            .query(trx)
            .modify( (builder) => { 
                //pagination ?? 
                builder.page(page, size)
            })
         // .where(filters)
    }
}