import { Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { autoInjectable } from 'tsyringe'
import { CreateProductUseCase } from "../../application/use-case/products/create-product-use-case";
import { StrictBody, StrictParams } from "../../external/web/validator";
import { CreateProductSchema } from "../schemas/product/create-product-schema";
import { ListProductUseCase } from "../../application/use-case/products/list-product-use-case";
import { ListProductParamsSchema } from "../schemas/product/list-product-params-schema";

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