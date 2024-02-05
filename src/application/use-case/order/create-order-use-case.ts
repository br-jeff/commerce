import { injectable } from "tsyringe";
import { GenericUseCaseType } from "../../types/default-use-case";
import { OrderRepository } from "../../../external/database/repository/order";
import { CreateOrderType } from "../../types/order-create-use-case";
import { AllItemsValidationUseCase } from "../inventory/all-items-validation-use-case";

@injectable()
export class CreateOrderUseCase {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly allItemsValidationUseCase: AllItemsValidationUseCase) { }

    execute({ data, trx }: GenericUseCaseType<CreateOrderType>) {
        // return this.orderRepository.list()
        const { orderItems } = data
        const productIds = data.orderItems.map((oi) => oi.productId)

        return this.allItemsValidationUseCase.execute({ data: orderItems })
    }
}