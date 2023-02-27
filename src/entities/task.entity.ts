import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startAt: Date;

  @Column({ nullable: true })
  finishAt: Date;

  @Column()
  deadLine: Date;

  @ManyToOne(() => Person, (person) => person.tasks)
  person: Person;
}
