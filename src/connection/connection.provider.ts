import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Environment } from "src/common/enums/environment.enum";

export const ConnectionProvider: DynamicModule = TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
        const isDevEnv: boolean = config.get('NODE_ENV') !== Environment.Production;
        const connection: TypeOrmModuleOptions = {
            type: 'postgres',
            host: config.get('HOST'),
            port: config.get('PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PW'),
            database: config.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: isDevEnv
        };

        return connection;
    },
});