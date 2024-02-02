import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { StrictParams } from "../external/web/validator";
import { ListProductParamsSchema } from "../domain/schemas/product/list-product-params-schema";
import { ListCategoryUseCase } from "../application/use-case/category/list-category-use-case";

@JsonController('/category')
@injectable()
export class Category {
    constructor(
        private readonly listCategoryUseCase: ListCategoryUseCase,
    ) { }

    @OpenAPI({
        summary: 'List Category',
        description: 'This route list products'
    })
    @Get()
    list(@StrictParams() pagination: ListProductParamsSchema) {
        return this.listCategoryUseCase.execute({ pagination  })
    }
}