import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../entities';
import { ResponseI } from 'src/common/interfaces';
import { CreateProjectDto, EditProjectDto } from '../dto';

@Injectable()
export class ProjectService {

    constructor(@InjectRepository(Project) private readonly projectRepository: Repository<Project>) {}

    public async findAllProjects(): Promise<Project[]> {
        const projects: Project[] = await this.projectRepository.find({relations: ['tasks']});
        
        if (projects.length === 0) throw new HttpException('There are no projects for the moment', HttpStatus.NO_CONTENT);
        if (projects.length > 0) return projects;
    }

    public async findOneProject(uuid: string): Promise<Project> {
        const project: Project = await this.projectRepository.findOneBy([{id: uuid}]);

        if (!project) throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        if (project) return project;
    }

    public async createProject(project: CreateProjectDto): Promise<ResponseI> {
        const creation: Project = await this.projectRepository.save(project);

        if (!creation) throw new HttpException('Opps! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (creation) {
            const res: ResponseI = {
                message: 'Project created succesfully',
                data: creation
            }

            return res;
        };
    }

    public async editProject(uuid: string, project: EditProjectDto): Promise<ResponseI> {
        const changes: UpdateResult = await this.projectRepository.update(uuid, project)

        if (changes.affected === 0) throw new HttpException('No project found', HttpStatus.NOT_FOUND);
        if (changes.affected == 1) {
            const project: Project = await this.findOneProject(uuid);

            const res: ResponseI = {
                message: 'Changes saved successfully',
                data: project
            }

            return res;
        };
     }

    public async deleteProject(uuid: string): Promise<void> {
        const res: DeleteResult = await this.projectRepository.delete(uuid);

        if (res.affected === 0) throw new HttpException('No project found with this uuid', HttpStatus.NOT_FOUND);
        if (res.affected === 1) throw new HttpException('Project deleted', HttpStatus.OK);
    }
}