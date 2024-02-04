import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { randomUUID } from "crypto";
import { OrderEntity } from "../../../domain/entities/order";
settings.staticsStrategy = 'proxy';

export class OrderModel extends Mixin(OrderEntity, Model) {
    static get tableName() {
        return 'orders'
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}