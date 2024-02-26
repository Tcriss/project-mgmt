import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { AccessLevel } from "src/common/enums";
import { User } from "../entities";
import { Project } from "src/modules/projects/entities";

export class RelateProjectDto {
    @IsNotEmpty()
    @IsEnum(AccessLevel)
    accessLevel: AccessLevel;

    @IsNotEmpty()
    @IsUUID()
    userId: User;

    @IsNotEmpty()
    @IsUUID()
    projectId: Project;
}