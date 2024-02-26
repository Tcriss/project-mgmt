import { Column, Entity, OneToMany } from "typeorm";
import { ProjectI } from "src/common/interfaces";
import { Base } from "src/common/utils/base.entity";
import { User } from "src/modules/user/entities";
import { Task } from "src/modules/tasks/entities/task.entity";

@Entity({name: 'project'})
export class Project extends Base implements ProjectI {
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @OneToMany(() => Task, (task) => task.projectId)
    tasks: Task[];

    @OneToMany(() => User, (user) => user.projects)
    userId: User;
}