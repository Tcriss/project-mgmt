import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UserModule } from './modules/user/user.module';
import { ConnectionModule } from "./connection/connection.module";
import { ProjectModule } from "./modules/projects/project.module";
import { TaskModule } from "./modules/tasks/task.module";
import { AuthModule } from "./modules/auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        ConnectionModule,
        ProjectModule,
        TaskModule,
        UserModule,
        AuthModule
    ]
})
export class AppModule {
    static port: number;

    constructor(private readonly config: ConfigService) {
        AppModule.port = this.config.get('PORT');
    }
}