import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        UserModule
    ]
})
export class AppModule {
    static port: number;

    constructor(private readonly config: ConfigService) {
        AppModule.port = this.config.get('PORT');
    }
}