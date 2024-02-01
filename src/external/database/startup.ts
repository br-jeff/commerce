import { container, injectable } from "tsyringe";
import { DatabaseConfiguration } from "./configuration";
import settings from "../config/settings";
import { NodeEnvEnum } from "../../domain/enums/node-env";


@injectable()
class StartupDatabase {
    constructor(private readonly databaseConfiguration: DatabaseConfiguration ) {}    
    async start() {
        if(settings.NODE_ENV === NodeEnvEnum.DEV ) {
            await this.databaseConfiguration.migrate()
            await this.databaseConfiguration.seed()
        }
    }
}

export default () => container.resolve(StartupDatabase).start()