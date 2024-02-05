import { Mixin, settings } from "ts-mixer";
import { Model } from 'objection'
import { InventoryEntity } from "../../../domain/entities/inventory";
import { randomUUID } from "crypto";
settings.staticsStrategy = 'proxy';


export class InventoryModel extends Mixin(InventoryEntity, Model) {
    static get tableName() {
        return 'products_inventories'
    }

    $beforeInsert() {
        if (!this.id) {
            this.id = randomUUID()
        }
    }
}