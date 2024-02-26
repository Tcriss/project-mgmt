import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [TypeOrmModule.forFeature([Project])]
})
export class ProjectModule {}