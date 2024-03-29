import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateProjectDto, EditProjectDto } from '../dto';
import { ProjectService } from '../services/project.service';
import { ResponseI } from 'src/common/interfaces';
import { Project } from '../entities';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {

    constructor(private readonly project: ProjectService) {}

    @Get()
    findAll(): Promise<Project[]> {
        return this.project.findAllProjects();
    }

    @Get(':uuid')
    findOne(@Param('uuid') uuid: string): Promise<Project> {
        return this.project.findOneProject(uuid);
    }

    @Post()
    create(@Body() project: CreateProjectDto): Promise<ResponseI> {
        return this.project.createProject(project);
    }

    @Patch(':uuid')
    edit(@Param('uuid') uuid: string, @Body() project: EditProjectDto): Promise<ResponseI> {
        return this.project.editProject(uuid, project);
    }

    @Delete(':uuid')
    delete(@Param('uuid') uuid: string): Promise<void> {
        return this.project.deleteProject(uuid);
    }
}
