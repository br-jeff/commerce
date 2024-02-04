import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { randomUUID } from "crypto";
import { PaymentEntity } from "../../../domain/entities/payments";
settings.staticsStrategy = 'proxy';

export class UserAddressModel extends Mixin(PaymentEntity, Model) {
    static get tableName() {
        return 'payments'
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}