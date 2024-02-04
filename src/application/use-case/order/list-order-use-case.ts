import { injectable } from "tsyringe";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { OrderRepository } from "../../../external/database/repository/order";
import { FilterOrderType } from "../../types/filter-order-use-case";

@injectable()
export class ListOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }

    execute({ filters, pagination, trx }: DefaultListUseCaseType<FilterOrderType>) {
        return this.orderRepository.list({ filters, pagination, trx })
    }
}