import { IsOptional, IsString, IsUUID } from "class-validator"

export class ListProductParamsSchema {
    @IsString()
    @IsOptional()
    id?: string
}