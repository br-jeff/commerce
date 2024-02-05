import { DefaultCreateUseCaseType, GenericUseCaseType } from '../../../application/types/default-use-case'
import { InventoryModel } from '../models/inventory'
import { InventoryEntity } from '../../../domain/entities/inventory'

export class ProductInventoryRepository {
    async insertInventory({ data, trx }: DefaultCreateUseCaseType<InventoryEntity>) {
        return InventoryModel
            .query(trx)
            .insertAndFetch(data)
    }
}