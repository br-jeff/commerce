import { injectable } from "tsyringe";
import { GenericUseCaseType } from "../../types/default-use-case";
import { OrderRepository } from "../../../external/database/repository/order";

@injectable()
export class CreateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }

    execute({ data, trx }: GenericUseCaseType<any>) {
        return data
        // return this.orderRepository.list()
    }
}