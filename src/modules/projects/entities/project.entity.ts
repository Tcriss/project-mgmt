import { Column, Entity, OneToMany } from "typeorm";
import { ProjectI } from "src/common/interfaces";
import { Base } from "src/common/utils/base.entity";
import { User } from "src/modules/user/entities";

@Entity({name: 'project'})
export class Project extends Base implements ProjectI {
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    @Column()
    task: string;

    @OneToMany(() => User, (user) => user.projects)
    user: User;
}