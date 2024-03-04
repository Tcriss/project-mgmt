import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { Task } from '../entities/task.entity';
import { CreateTaskDto, EditTaskDto } from '../dto';
import { ResponseI } from 'src/common/interfaces';

@Injectable()
export class TaskService {

    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

    public async findAllTasks(): Promise<Task[]> {
        const tasks: Task[] = await this.taskRepository.find();
        
        if (tasks.length === 0) throw new HttpException('There are no tasks for the moment', HttpStatus.NO_CONTENT);
        if (tasks.length > 0) return tasks;
    }

    public async findOneTask(uuid: string): Promise<Task> {
        const task: Task = await this.taskRepository.findOneBy({id: uuid});

        if (!task) throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        if (task) return task;
    }
    
    public async createTask(task: CreateTaskDto): Promise<ResponseI> {
        const creation: Task = await this.taskRepository.save(task);

        if (!creation) throw new HttpException('Opps! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (creation) {
            const res: ResponseI = {
                message: 'Task created succesfully',
                data: creation
            }

            return res;
        };
    }

    public async editTask(uuid: string, task: EditTaskDto): Promise<ResponseI> {
        const changes: UpdateResult = await this.taskRepository.update(uuid, task)

        if (changes.affected === 0) throw new HttpException('No task found', HttpStatus.NOT_FOUND);
        if (changes.affected == 1) {
            const task: Task = await this.findOneTask(uuid);

            const res: ResponseI = {
                message: 'Changes saved successfully',
                data: task
            }

            return res;
        };
    }

    public async deleteTask(uuid: string): Promise<void> {
        const res: DeleteResult = await this.taskRepository.delete(uuid);

        if (res.affected === 0) throw new HttpException('No task found with this uuid', HttpStatus.NOT_FOUND);
        if (res.affected === 1) throw new HttpException('Task deleted', HttpStatus.OK);
    }
}
