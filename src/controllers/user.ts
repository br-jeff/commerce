import { JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { Serializer, StrictBody } from "../external/web/validator";

import { AuthUseCase } from "../application/use-case/user/auth-use-case";
import { CreateUserUseCase } from "../application/use-case/user/create-user-use-case";
import { LoginSchema } from "../domain/schemas/auth/login-schema";
import { CreateUserSchema } from "../domain/schemas/user/create-user-schema";
import { UserSerializer } from "../domain/serializers/user";


@JsonController()
@injectable()
export class User {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly authUseCase: AuthUseCase
    ) { }

    @OpenAPI({
        summary: 'Create user',
        description: 'Create user'
    })
    @Post('/register')
    @Serializer(UserSerializer)
    create(@StrictBody() data: CreateUserSchema) {
        return this.createUserUseCase.execute({ data })
    }

    @OpenAPI({
        summary: 'Login',
        description: 'Login route'
    })
    @Post('/login')
    @Serializer(UserSerializer)
    login(@StrictBody() data: LoginSchema) {
        return this.authUseCase.execute({ data })
    }
}