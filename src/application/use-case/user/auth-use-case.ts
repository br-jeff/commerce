import { injectable } from "tsyringe";
import { UserRepository } from "../../../external/database/repository/user";
import { GenericUseCaseType } from "../../types/default-use-case";
import { EncryptionProvider } from "../../../domain/providers/encryption-provider";
import { UnauthorizedError } from "routing-controllers";
import { JWTProvider } from "../../../domain/providers/jwt-provider";

type Data = {
  username: string;
  password: string;
}

@injectable()
export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptionProvider: EncryptionProvider,
    private readonly tokenProvider: JWTProvider
  ) { }

  async execute({ data, trx }: GenericUseCaseType<Data>) {
    try {
      const user = await this.userRepository.login({ data: { username: data.username }, trx })
      const validation = await this.encryptionProvider.verify(data.password, user.password)
      if (!validation) throw new Error()

      return {
        acessToken: this.tokenProvider.createAcessToken({
          id: user.id,
          username: user.username
        })
      }
    } catch (err) {
      throw new UnauthorizedError()
    }
  }



}