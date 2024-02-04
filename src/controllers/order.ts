import { Body, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'
import { ListOrderUseCase } from "../application/use-case/order/list-order-use-case";
import { PaginationSchema } from "../domain/schemas";
import { StrictQueryParams } from "../external/web/validator";
import { CreateOrderUseCase } from "../application/use-case/order/create-order-use-case";
import { CreateOrderSchema } from "../domain/schemas/orders/create-order-schema";

@JsonController('/order')
@injectable()
export class Product {
    constructor(
        private readonly listOrderUseCase: ListOrderUseCase,
        private readonly createOrderUseCase: CreateOrderUseCase
    ) { }

    @OpenAPI({
        summary: 'List orders',
        description: 'This route list orders'
    })

    @Get()
    list(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listOrderUseCase.execute({ pagination })
    }

    @OpenAPI({
        summary: 'create orders',
        description: 'This route create orders'
    })
    @Post()
    create(@Body() data: CreateOrderSchema) {
        return this.createOrderUseCase.execute({ data })
    }
}