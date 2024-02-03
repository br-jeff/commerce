import { Authorized, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { CreateProductUseCase } from "../application/use-case/products/create-product-use-case";
import { ListProductUseCase } from "../application/use-case/products/list-product-use-case";
import { StrictBody, StrictQueryParams } from "../external/web/validator";
import { CreateProductSchema } from "../domain/schemas/product/create-product-schema";
import { PaginationSchema } from "../domain/schemas";

@JsonController('/product')
@injectable()
export class Product {
    constructor(
        private readonly listProductUseCase: ListProductUseCase,
        private readonly createProductUseCase: CreateProductUseCase
    ) { }

    @OpenAPI({
        summary: 'List products',
        description: 'This route list products'
    })

    @Get()
    listProducts(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listProductUseCase.execute({ pagination })
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