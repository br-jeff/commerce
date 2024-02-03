import { injectable } from "tsyringe";
import { ProductRepository } from "../../../external/database/repository/product";
import { ProductEntity } from "../../../domain/entities/product";
import { CreateUseCaseWithUserType } from "../../types/default-use-case";
import { BadRequestError } from "routing-controllers";
import { UserRepository } from "../../../external/database/repository/user";
import { UserModel } from "../../../external/database/models/user";

@injectable()
export class CreateProductUseCase {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly userRepository: UserRepository
    ) { }

    async execute({ data, user, trx }: CreateUseCaseWithUserType<ProductEntity>) {
        const admin = await this.userRepository.getUserByUsername({ username: 'admin' }) as UserModel
        if (user.id !== admin.id) {
            throw new BadRequestError('User is not admin')
        }
        return this.productRepository.insertProduct({ data, trx })
    }
}