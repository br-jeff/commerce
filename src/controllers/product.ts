import { Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { autoInjectable } from 'tsyringe'

import { CreateProductUseCase } from "../application/use-case/products/create-product-use-case";
import { ListProductUseCase } from "../application/use-case/products/list-product-use-case";
import { StrictParams, StrictBody } from "../external/web/validator";
import { ListProductParamsSchema } from "../domain/schemas/product/list-product-params-schema";
import { CreateProductSchema } from "../domain/schemas/product/create-product-schema";


@JsonController('/product')
@autoInjectable()
export class Health {
    constructor(
        private readonly listProductUseCase: ListProductUseCase,
        private readonly createProductUseCase: CreateProductUseCase
    ) { }

    @OpenAPI({
        summary: 'List products',
        description: 'This route list products'
    })
    @Get()
    listProducts(@StrictParams() filters: ListProductParamsSchema) {
        return this.listProductUseCase.execute({ filters, pagination: { limit: 1, offset: 0 } })
    }

    @OpenAPI({
        summary: 'Create products',
        description: 'This route create a product'
    })
    @Post()
    create(@StrictBody() data: CreateProductSchema) {
        return this.createProductUseCase.execute({ data })
    }
}