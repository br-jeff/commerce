import { injectable } from "tsyringe";
import { DefaultCreateUseCaseType } from "../../types/default-use-case";
import { UserAddressRepository } from "../../../external/database/repository/user-address";
import { UserAddressEntity } from "../../../domain/entities/user_address";

@injectable()
export class CreateUserAddressUseCase {
    constructor(private readonly userAddressRepository: UserAddressRepository
    ) { }

    execute({ data, trx }: DefaultCreateUseCaseType<UserAddressEntity>) {
        return this.userAddressRepository.createAddress({ data, trx })
    }
}