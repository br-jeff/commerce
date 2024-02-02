import { IsOptional, IsUUID } from "class-validator"
import { PaginationSchema } from ".."

export class ListProductParamsSchema extends PaginationSchema {  
    @IsUUID()
    @IsOptional()
    id?: string
}