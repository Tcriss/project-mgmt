import { Controller, Body, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';
import { ResponseI } from 'src/common/interfaces';
import { CreateTaskDto, EditTaskDto } from '../dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TaskController {

    constructor(private readonly task: TaskService) {}

    @Get()
    findAll(): Promise<Task[]> {
        return this.task.findAllTasks();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<Task> {
        return this.task.findOneTask(uuid);
    }

    @Post()
    create(@Body() task: CreateTaskDto): Promise<ResponseI> {
        return this.task.createTask(task);
    }

    @Patch(':uuid')
    edit(@Param('uuid') uuid: string, @Body() task: EditTaskDto): Promise<ResponseI> {
        return this.task.editTask(uuid, task);
    }

    @Delete(':uuid')
    delete(@Param('uuid') uuid: string): Promise<void> {
        return this.task.deleteTask(uuid);
    }
}
