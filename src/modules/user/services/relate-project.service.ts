import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserProjects } from '../entities/user-projects.entity';
import { Repository } from 'typeorm';
import { RelateProjectDto } from '../dto';
import { ResponseI } from 'src/common/interfaces';

@Injectable()
export class RelateProjectService {

    constructor(@InjectRepository(UserProjects) private readonly userProjectsRepository: Repository<UserProjects>) {}

    public async createRelation(relation: RelateProjectDto): Promise<ResponseI> {
        const creation: UserProjects = await this.userProjectsRepository.save(relation);

        if (!creation) throw new HttpException('Opps! something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (creation) {
            const res: ResponseI = {
                message: 'Relation created succesfully',
                data: creation
            }

            return res;
        }
    }
}