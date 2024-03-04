import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { Project } from './entities';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [TypeOrmModule.forFeature([Project])]
})
export class ProjectModule {}
