import { UserTask } from "src/user-task/entities/user-task.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email : string;

    @Column()
    password: string

    @OneToMany(() => UserTask , (usertasks) => usertasks.user_id)
    tasks: UserTask[];
}
