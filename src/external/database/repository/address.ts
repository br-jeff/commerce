import { ProductEntity } from '../../../domain/entities/product'
import { FilterProductType } from '../../../application/types/filter-product-use-case'
import { DefaultCreateUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'
import { CategoryModel } from '../models/category'
import { Address } from '../../../controllers/address'

export class AddressRepository {
    async insert({ data, trx }: DefaultCreateUseCaseType<ProductEntity>) {
        return CategoryModel
            .query(trx)
            .insertAndFetch(data)
    }

    async list({ filters, pagination, trx }: DefaultListUseCaseType<FilterProductType>) {
        return Address.query(trx)
        //  .where(filters)
    }
}