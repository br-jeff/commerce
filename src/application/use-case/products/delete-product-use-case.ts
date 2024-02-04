import { injectable } from "tsyringe";
import { ProductRepository } from "../../../external/database/repository/product";
import { GenericUseCaseType } from "../../types/default-use-case";
import { UserEntity } from "../../../domain/entities/user";
import { UserHelpers } from "../../../external/utils/user-helpers";
import { NotFoundError } from "routing-controllers";

@injectable()
export class DeleteProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly userHelpers: UserHelpers
    ) { }

    async execute({ data, trx }: GenericUseCaseType<{ id: string, user: UserEntity }>) {
        await this.userHelpers.validateIsAdmin(data.user.id)
        const rowsDeleted = await this.productRepository.deleteProductById({ id: data.id, trx })

        if (rowsDeleted === 0) {
            throw new NotFoundError('We could not find the product with the specified ID')
        }

        return { status: "Sucess" }
    }
}