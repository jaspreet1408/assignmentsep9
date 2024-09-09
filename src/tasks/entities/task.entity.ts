import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'task'})
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
}