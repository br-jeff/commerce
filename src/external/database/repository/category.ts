import { ProductEntity } from '../../../domain/entities/product'
import { FilterProductType } from '../../../application/types/filter-product-use-case'
import { DefaultCreateUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'
import { CategoryModel } from '../models/category'

export class CategoryRepository {
    async insert({ data, trx }: DefaultCreateUseCaseType<ProductEntity>) {
        return CategoryModel
            .query(trx)
            .insertAndFetch(data)
    }

    async list({ filters, pagination, trx }: DefaultListUseCaseType<FilterProductType>) {
        console.log(pagination)
        return CategoryModel.query(trx)
          //  .where(filters)
    }
}