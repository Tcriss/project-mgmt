import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { UserProjects } from './entities/user-projects.entity';
import { Project } from '../projects/entities';

@Module({
    providers: [UserService],
    controllers: [UserController],
    imports: [TypeOrmModule.forFeature([User, UserProjects, Project])]
})
export class UserModule {}
