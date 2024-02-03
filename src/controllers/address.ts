import { Authorized, Body, CurrentUser, Get, JsonController, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { injectable } from 'tsyringe'

import { StrictQueryParams } from "../external/web/validator";
import { PaginationSchema } from "../domain/schemas";
import { ListUserAddressUseCase } from "../application/use-case/address/list-addresses";
import { UserModel } from "../external/database/models/user";
import { CreateUserAddressUseCase } from "../application/use-case/address/create-user-address";
import { CreatUserAddressSchema } from "../domain/schemas/address/create-address-schema";

@JsonController('/address')
@injectable()
export class Address {
    constructor(
        private readonly listUserAddressUseCase: ListUserAddressUseCase,
        private readonly createUserAddressUseCase: CreateUserAddressUseCase
    ) { }

    @OpenAPI({
        summary: 'List User Address',
        description: 'This route list User Address'
    })
    @Get()
    @Authorized()
    async listUserAddresses(@StrictQueryParams() pagination: PaginationSchema, @CurrentUser() user: UserModel) {
        const filters = { userId: user.id }
        return this.listUserAddressUseCase.execute({ filters, pagination })
    }

    @OpenAPI({
        summary: 'Create User Address',
        description: 'This route create User Address'
    })
    @Post()
    @Authorized()
    async createUserAddresses(@Body() payload: CreatUserAddressSchema, @CurrentUser() user: UserModel) {
        const data = { ...payload, userId: user.id }
        return this.createUserAddressUseCase.execute({ data })
    }
}