import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { randomUUID } from "crypto";
import { OrderItemsEntity } from "../../../domain/entities/order-items";
settings.staticsStrategy = 'proxy';

export class OrderModel extends Mixin(OrderItemsEntity, Model) {
    static get tableName() {
        return 'order_items'
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}