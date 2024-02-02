import { injectable } from "tsyringe";
import { ProductRepository } from "../../../external/database/repository/product";
import { FilterProductType } from "../../types/filter-product-use-case";
import { DefaultListUseCaseType } from "../../types/default-use-case";

@injectable()
export class ListProductUseCase {
    constructor(private readonly productRepository: ProductRepository
    ) { }

    execute({ filters, pagination, trx }: DefaultListUseCaseType<FilterProductType>) {
        return this.productRepository.list({ filters, pagination, trx })
    }
}