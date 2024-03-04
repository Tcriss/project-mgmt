import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RelateProjectService } from '../services/relate-project.service';
import { RelateProjectDto } from '../dto';
import { ResponseI } from 'src/common/interfaces';

@ApiTags('Relate')
@Controller('relate')
export class RelateProjectController {

    constructor(private readonly relate: RelateProjectService) {}

    @Post()
    create(@Body() relation: RelateProjectDto): Promise<ResponseI> {
        return this.relate.createRelation(relation);
    }
}
