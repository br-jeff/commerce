import { Authorized, Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { StrictQueryParams } from "../external/web/validator";
import { ListCategoryUseCase } from "../application/use-case/category/list-category-use-case";
import { PaginationSchema } from "../domain/schemas";

@JsonController('/category')
@injectable()
export class Category {
    constructor(
        private readonly listCategoryUseCase: ListCategoryUseCase,
    ) { }

    @OpenAPI({
        summary: 'List Category',
        description: 'This route list category'
    })
    @Get()
    @Authorized()
    list(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listCategoryUseCase.execute({ pagination })
    }
}