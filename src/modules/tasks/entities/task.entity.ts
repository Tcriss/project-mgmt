import { Status } from "src/common/enums/status.enum";
import { TaskI } from "src/common/interfaces";
import { Base } from "src/common/entities/base.entity";
import { Project } from "src/modules/projects/entities";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity('task')
export class Task extends Base implements TaskI {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column({type: 'enum', enum: Status})
    status: Status;

    @Column()
    assigned: string;

    @ManyToOne(() => Project, (project) => project.tasks)
    projectId: Project;
}