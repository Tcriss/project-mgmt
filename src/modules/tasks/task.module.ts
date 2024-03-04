import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { Task } from './entities/task.entity';
import { Project } from '../projects/entities';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([Task, Project])]
})
export class TaskModule {}
