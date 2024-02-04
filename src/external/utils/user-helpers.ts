import { BadRequestError } from "routing-controllers"
import { UserModel } from "../database/models/user"
import { UserRepository } from "../database/repository/user"
import { injectable } from "tsyringe"


@injectable()
export class UserHelpers {
    constructor(private readonly userRepository: UserRepository) { }

    async validateIsAdmin(userId: string) {
        const admin = await this.userRepository.getUserByUsername({ username: 'admin' }) as UserModel
        if (userId !== admin.id) {
            throw new BadRequestError('User is not admin')
        }
    }
}