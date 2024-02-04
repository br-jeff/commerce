import { randomUUID } from 'crypto'

import { faker } from '@faker-js/faker'
import { UserEntity } from '../../src/domain/entities/user'

export function createUser(fields: Partial<UserEntity> = {}): UserEntity {
    return {
        id: randomUUID(),
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: faker.hacker.abbreviation(),
        email: faker.internet.email(),
        telephone: String(faker.number.bigInt()),
        mobile: String(faker.number.bigInt()),
        createdAt: new Date().toISOString(),
        ...fields,
    }
}
