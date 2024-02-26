import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserProjects } from './entities/user-projects.entity';
import { RelateProjectService } from './services/relate-project.service';
import { RelateProjectController } from './controllers/relate-project.controller';
import { User } from './entities';

@Module({
    providers: [UserService, RelateProjectService],
    controllers: [UserController, RelateProjectController],
    imports: [TypeOrmModule.forFeature([User, UserProjects])],
    exports: [UserService]
})
export class UserModule {}
