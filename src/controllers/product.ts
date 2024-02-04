import { Authorized, CurrentUser, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { CreateProductUseCase } from "../application/use-case/products/create-product-use-case";
import { ListProductUseCase } from "../application/use-case/products/list-product-use-case";
import { StrictBody, StrictQueryParams } from "../external/web/validator";
import { CreateProductSchema } from "../domain/schemas/product/create-product-schema";
import { PaginationSchema } from "../domain/schemas";
import { UserEntity } from "../domain/entities/user";
import { DeleteProductUseCase } from "../application/use-case/products/delete-product-use-case";

@JsonController('/product')
@injectable()
export class Product {
    constructor(
        private readonly listProductUseCase: ListProductUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase

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
    @Authorized()
    create(@StrictBody() data: CreateProductSchema, @CurrentUser() user: UserEntity) {
        return this.createProductUseCase.execute({ data, user })
    }

    @OpenAPI({
        summary: 'Delete product',
        description: 'This route delete a product'
    })
    @Delete('/:id')
    @Authorized()
    delete(@Param('id') id: string, @CurrentUser() user: UserEntity) {
        return this.deleteProductUseCase.execute({ data: { id, user } })
    }
}