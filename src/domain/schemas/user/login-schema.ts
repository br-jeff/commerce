import { IsNumber, IsString } from "class-validator"

export class CreateUserSchema {
    @IsString()
    username: string

    @IsString()
    password: string
}
