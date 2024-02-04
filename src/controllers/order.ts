import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'
import { ListOrderUseCase } from "../application/use-case/order/list-order-use-case";
import { PaginationSchema } from "../domain/schemas";
import { StrictQueryParams } from "../external/web/validator";

@JsonController('/order')
@injectable()
export class Product {
    constructor(
        private readonly listOrderUseCase: ListOrderUseCase,
    ) { }

    @OpenAPI({
        summary: 'List orders',
        description: 'This route list orders'
    })

    @Get()
    list(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listOrderUseCase.execute({ pagination })
    }
}