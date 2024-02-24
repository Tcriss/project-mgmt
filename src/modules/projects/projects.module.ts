import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities';
import { User } from '../user/entities';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [TypeOrmModule.forFeature([Project, User])]
})
export class ProjectsModule {}
