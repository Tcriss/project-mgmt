import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { AccessLevel } from "src/common/enums";
import { User } from "../entities";
import { Project } from "src/modules/projects/entities";

export class RelateProjectDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(AccessLevel)
    accessLevel: AccessLevel;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: User;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    projectId: Project;
}