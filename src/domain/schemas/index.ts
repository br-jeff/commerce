import { Expose, Transform } from "class-transformer"
import { IsNumber, IsString, Min } from "class-validator"

export class PaginationSchema {
    @Expose()
    @Transform(({ value }) => value ?? 1)
    @IsNumber()
    @Min(1)
    page: number
  
    @Expose()
    @Transform(({ value }) => value ?? 10)
    @Min(1)
    @IsNumber()
    size: number
  }