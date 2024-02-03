import { injectable } from "tsyringe";
import { DefaultListUseCaseType } from "../../types/default-use-case";
import { UserAddressRepository } from "../../../external/database/repository/user-address";
import { UserAdressFilterUseCase } from "../../types/user-address-filter-use-case";

@injectable()
export class ListUserAddressUseCase {
    constructor(private readonly userAddressRepository: UserAddressRepository
    ) { }

    async execute({ filters, pagination, trx }: DefaultListUseCaseType<UserAdressFilterUseCase>) {
        const t = await this.userAddressRepository.listUserAddress({ filters, pagination, trx })
        console.log({ t, pagination })
        return t
    }
}
