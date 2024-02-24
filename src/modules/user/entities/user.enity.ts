import { Column, Entity, ManyToOne } from "typeorm";
import { Roles } from "src/common/enums";
import { UserI } from "src/common/interfaces";
import { Base } from "src/common/utils/base.entity";
import { Project } from "src/modules/projects/entities";

@Entity({name: 'user'})
export class User extends Base implements UserI {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    userName: string;

    @Column()
    password: string;

    @Column({type: 'enum', enum: Roles})
    role: Roles;

    @ManyToOne(() => Project, (project) => project.user)
    projects: Project[];
}