import { Get, JsonController } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import {  injectable } from 'tsyringe'
import { GetHealthUseCase } from "../application/use-case/health/get-health-use-case";

@JsonController()
@injectable()
export class Health {
  constructor(
    private readonly getHealthUseCase: GetHealthUseCase
  ) { }

  @OpenAPI({
    summary: 'Server Health',
    description: 'This is to check if server is running'
  })
  @Get('/health')
  getHealth() {
    return this.getHealthUseCase.execute()
  }
}