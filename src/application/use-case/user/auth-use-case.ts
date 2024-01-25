import { injectable } from "tsyringe";
import { UserRepository } from "../../../external/database/repository/user";
import { GenericUseCaseType } from "../../types/default-use-case";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { UnauthorizedError } from "routing-controllers";
import { sign } from 'jsonwebtoken'
import settings from "../../../external/config/settings";

type Data = {
  username: string;
  password: string;
}

type AcessTokenData = {
  id: string
  username: string
}

@injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionProvider: EncryptionProvider
  ) { }

  async execute({ data, trx }: GenericUseCaseType<Data>) {
    try {
      const user = await this.userRepository.login({ data: { username: data.username }, trx })
      const validation = await this.encryptionProvider.verify(data.password, user.password)
      if (!validation) throw new Error()

      return {
        acessToken: this.createAcessToken({
          id: user.id,
          username: user.username
        })
      }
    } catch (err) {
      throw new UnauthorizedError()
    }
  }

  private createAcessToken(data: AcessTokenData) {
    const payload = {
      user: data
    }

    return sign(
      payload,
      settings.ACESS_TOKEN_SECRET,
      {
        expiresIn: '20m'
      }
    )
  }

}