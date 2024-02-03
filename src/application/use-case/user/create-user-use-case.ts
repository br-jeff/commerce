import { injectable } from "tsyringe";
import { UserRepository } from "../../../external/database/repository/user";
import { DefaultCreateUseCaseType } from "../../types/default-use-case";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { UserEntity } from "../../../domain/entities/user";
import { UserAddressRepository } from "../../../external/database/repository/user-address";
import { UserAddressEntity } from "../../../domain/entities/user_address";
import { BadRequestError } from "routing-controllers";

type UserTypeWithAddress = UserEntity & { userAddress: UserAddressEntity }

@injectable()
export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userAddressRepository: UserAddressRepository,
        private readonly encryptionProvider: EncryptionProvider) { }

    async execute({ data, trx }: DefaultCreateUseCaseType<UserTypeWithAddress>) {
        const { username, firstName, lastName, telephone, mobile, email, password } = data
        const hasUser = await this.userRepository.checkEmailAndUsername({ email, username })

        if (hasUser) {
            throw new BadRequestError('email or username is already taken')
        }

        const user = {
            username,
            firstName,
            lastName,
            telephone,
            mobile,
            password: await this.encryptionProvider.createHash(password),
            email,
        }

        const newUser = await this.userRepository.createUser({ data: user, trx })
        const address = { ...data.userAddress, userId: newUser.id }
        await this.userAddressRepository.createAddress({ data: address, trx })

        return { ...user, userAddress: data.userAddress }
    }
}