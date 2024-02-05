import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { randomUUID } from "crypto";
import { OrderItemsEntity } from "../../../domain/entities/order-items";
import { ProductModel } from "./product";
settings.staticsStrategy = 'proxy';

export class OrderItemsModel extends Mixin(OrderItemsEntity, Model) {
    static get tableName() {
        return 'order_items'
    }

    static get relationMappings() {
        return {
            product: {
                modelClass: ProductModel,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'order_items.productId',
                    to: 'products.id'
                }
            },
        }
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}