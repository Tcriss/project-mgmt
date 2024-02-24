import { Column, Entity, ManyToOne } from "typeorm";
import { Roles } from "src/common/enums";
import { UserI } from "src/common/interfaces";
import { Base } from "src/common/utils/base.entity";
import { UserProjects } from "./user-projects.entity";

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

    @ManyToOne(() => UserProjects, (project) => project.user)
    projects: UserProjects[];
}