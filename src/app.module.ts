import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from './modules/user/user.module';
import { ConnectionModule } from "./connection/connection.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        UserModule,
        ConnectionModule
    ]
})
export class AppModule {
    static port: number;

    constructor(private readonly config: ConfigService) {
        AppModule.port = this.config.get('PORT');
    }
}