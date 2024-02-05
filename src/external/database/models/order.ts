import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { randomUUID } from "crypto";
import { OrderEntity } from "../../../domain/entities/order";
import { UserModel } from "./user";
import { PaymentModel } from "./payment";
import { OrderItemsModel } from "./order-items";
settings.staticsStrategy = 'proxy';

export class OrderModel extends Mixin(OrderEntity, Model) {
    static get tableName() {
        return 'orders'
    }

    static get relationMappings() {
        return {
            user: {
                modelClass: UserModel,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'orders.userId',
                    to: 'users.id'
                }
            },
            payment: {
                modelClass: PaymentModel,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: 'orders.paymentId',
                    to: 'payments.id'
                }
            },
            orderItems: {
                modelClass: OrderItemsModel,
                relation: Model.HasManyRelation,
                join: {
                    from: 'orders.id',
                    to: 'order_items.order_id'
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