import { Column, Entity, ManyToOne } from "typeorm";
import { AccessLevel } from "src/common/enums";
import { User } from "./user.enity";
import { Project } from "src/modules/projects/entities";
import { Base } from "src/common/utils/base.entity";

@Entity('user_projects')
export class UserProjects extends Base {
    @Column({type: 'enum', enum: AccessLevel})
    accessLevel: AccessLevel;

    @ManyToOne(() => User, (user) => user.projects)
    userId: User;

    @ManyToOne(() => Project, (project) => project.userId)
    projectId: Project;
}