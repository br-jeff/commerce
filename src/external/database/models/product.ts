import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { ProductEntity } from "../../../domain/entities/product";
import { randomUUID } from "crypto";
import { InventoryModel } from "./inventory";
settings.staticsStrategy = 'proxy';

export class ProductModel extends Mixin(ProductEntity, Model) {
    static get tableName() {
        return 'products'
    }

    static get relationMappings() {
        return {
            inventory: {
                modelClass: InventoryModel,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'products.inventoryId',
                    to: 'products_inventories.id'
                }
            }
        }
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}