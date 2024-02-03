import { DefaultCreateUseCaseType, DefaultListUseCaseType } from '../../../application/types/default-use-case'
import { UserAddressModel } from '../models/user-address'
import { UserAddressEntity } from '../../../domain/entities/user_address'
import { UserAdressFilterUseCase } from '../../../application/types/user-address-filter-use-case'

export class UserAddressRepository {
    async listUserAddress({ filters, pagination, trx }: DefaultListUseCaseType<UserAdressFilterUseCase>) {
        const { page, size } = pagination
        console.log({ filters })
        return UserAddressModel
            .query(trx)
            .page(page - 1, size)
    }

    async createAddress({ data, trx }: DefaultCreateUseCaseType<UserAddressEntity>) {
        return UserAddressModel
            .query(trx)
            .insertAndFetch(data)
    }
}