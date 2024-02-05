import { Authorized, Body, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'
import { ListOrderUseCase } from "../application/use-case/order/list-order-use-case";
import { PaginationSchema } from "../domain/schemas";
import { ArraySerializer, Serializer, StrictQueryParams } from "../external/web/validator";
import { CreateOrderUseCase } from "../application/use-case/order/create-order-use-case";
import { CreateOrderSchema } from "../domain/schemas/orders/create-order-schema";
import { UserEntity } from "../domain/entities/user";
import { ListOrdersSerializer, OrderSerializer } from "../domain/serializers/orders/order-all-relations";

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
    @Serializer(ListOrdersSerializer)
    @Get()
    list(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listOrderUseCase.execute({ pagination })
    }

    @OpenAPI({
        summary: 'create orders',
        description: 'This route create orders'
    })
    @Serializer(OrderSerializer)
    @Authorized()
    @Post()
    async create(@Body() data: CreateOrderSchema, @CurrentUser() user: UserEntity) {
        return await this.createOrderUseCase.execute({ data: { ...data, user } })
    }
}