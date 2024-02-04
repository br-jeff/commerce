import { injectable } from "tsyringe";
import { ProductRepository } from "../../../external/database/repository/product";
import { ProductEntity } from "../../../domain/entities/product";
import { CreateUseCaseWithUserType } from "../../types/default-use-case";
import { UserHelpers } from "../../../external/utils/user-helpers";

@injectable()
export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly userHelpers: UserHelpers
    ) { }

    async execute({ data, user, trx }: CreateUseCaseWithUserType<ProductEntity>) {
        await this.userHelpers.validateIsAdmin(user.id)
        return this.productRepository.insertProduct({ data, trx })
    }
}