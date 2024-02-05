


import { injectable } from "tsyringe";
import { GenericUseCaseType } from "../../types/default-use-case";
import { ProductRepository } from "../../../external/database/repository/product";
import { BadRequestError } from "routing-controllers";
import { CreateOrderItemsType } from "../../types/create-order-items-type";

@injectable()
export class ItemsDetailsUseCase {
    constructor(
        private readonly productRepository: ProductRepository) { }

    async execute({ data, trx }: GenericUseCaseType<CreateOrderItemsType[]>) {
        const ids = data.map((oi) => oi.productId)
        const itemsDetails = await this.productRepository.availables({ data: { ids }, trx })

        for (let items of data) {
            const product = itemsDetails.find((item) => item.id === items.productId)
            if (!product || !product.inventory) {
                throw new BadRequestError(`we can't find item with id: ${items.productId} `)
            }

            if (items.quantity > product.inventory.quantity) {
                throw new BadRequestError(`we just have ${product.inventory.quantity} of ${product.name}`)
            }
        }

        return itemsDetails
    }
}