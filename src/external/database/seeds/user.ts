import { UserModel } from "../models/user";
import { logger } from "../../utils/logger";
import { DefaultModelOmit } from "../../../application/types/default-model-omit";
import { UserAddressEntity } from "../../../domain/entities/user_address";
import { faker } from "@faker-js/faker";
import { UserAddressModel } from "../models/user-address";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { container } from "tsyringe";

export async function seed() {
    logger.info('Start Seeeds')
    const user = {
        id: '8d887c80-4ddb-4ae1-9c3b-b2d11bda884e',
        username: 'admin',
        password: await container.resolve(EncryptionProvider).createHash('password123'),
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin@admin.com',
        mobile: String(faker.number.int({ min: 8000, max: 8999 })),
        telephone: String(faker.number.int({ min: 8000, max: 8999 })),
    }

    const userQuery = await UserModel.query()
        .insertAndFetch(user)

    const userAddress: DefaultModelOmit<UserAddressEntity> = {
        userId: userQuery.id,
        addressLine1: faker.location.streetAddress(),
        addressLine2: faker.location.secondaryAddress(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country(),
        city: faker.location.city(),
    }

    await UserAddressModel.query()
        .insert(userAddress)
}
