import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from './task.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Task, (task) => task.person)
  tasks: Task[];

  @Column({ nullable: true })
  createAt: Date;

  @Column({ nullable: true })
  deleteAt: Date;

  @Column({ nullable: true })
  updateAt: Date;
}
