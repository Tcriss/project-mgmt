import { BaseEntity, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AccesLevel } from "src/common/enums";
import { User } from "./user.enity";
import { Project } from "src/modules/projects/entities";
import { Base } from "src/common/utils/base.entity";

@Entity('user_projects')
export class UserProjects extends Base {
    @Column({type: 'enum', enum: AccesLevel})
    accesLevel: string;

    @ManyToOne(() => User, (user) => user.projects)
    user: User;

    @ManyToOne(() => Project, (project) => project.user)
    project: Project[];
}