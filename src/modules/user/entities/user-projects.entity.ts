import { Column, Entity, ManyToOne } from "typeorm";

import { User } from "./user.enity";
import { Base } from "src/common/entities/base.entity";
import { Project } from "src/modules/projects/entities";
import { AccessLevel } from "src/common/enums";

@Entity('user_projects')
export class UserProjects extends Base {
    @Column({type: 'enum', enum: AccessLevel})
    accessLevel: AccessLevel;

    @ManyToOne(() => User, (user) => user.projects)
    userId: User;

    @ManyToOne(() => Project, (project) => project.userId)
    projectId: Project;
}