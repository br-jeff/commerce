import { container } from 'tsyringe'
import { AuthUseCase } from './auth-use-case'
import { startDb } from '../../../../test/setup/teste-db'
import { UnauthorizedError } from 'routing-controllers'

describe('AuthUseCase', () => {
    test('Get rejected if not found user', async () => {
        await startDb()

        const sut = container.resolve(AuthUseCase)
        const data = { username: 'Admin', password: 'HASHABCDE' }

        expect(sut.execute({ data })).rejects.toThrow(UnauthorizedError)
    })
})
