import { Authorized, Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { StrictQueryParams } from "../external/web/validator";
import { PaginationSchema } from "../domain/schemas";
import { ListUserAddressUseCase } from "../application/use-case/address/list-addresses";

@JsonController('/address')
@injectable()
export class Address {
    constructor(private readonly listUserAddressUseCase: ListUserAddressUseCase) { }

    @OpenAPI({
        summary: 'List User Address',
        description: 'This route list User Address'
    })
    @Get()
    // @Authorized()
    async listUserAddresses(@StrictQueryParams() pagination: PaginationSchema) {
        return this.listUserAddressUseCase.execute({ pagination })
    }
}