import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user-task'})
export class UserTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    task_id : number;
    
    @Column()
    status: string;

    @ManyToOne((type) => User, user => user.id)
    user: User;

}
