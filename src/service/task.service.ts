import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Person } from '../entities/person.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

//Criar tarefa
  async createTask(task: Task): Promise<Task> {
    return this.taskRepository.save(task);
  }

  //Atribuir tarefa a pessoa
  async assignTaskToPerson(personId: number, taskId: number): Promise<Task> {
    const taskWhere = 'task.id = '.concat(taskId["taskId"])
    const task = await this.taskRepository.createQueryBuilder('task')
      .where(taskWhere)
      .getOne();
    
    const person = await this.personRepository.createQueryBuilder('person')
      .leftJoinAndSelect('person.tasks', 'task')
      .where('person.id = :id', { id: personId })
      .getOne();
  
    if (!person || !person.tasks) { // adicionando a verificação para o objeto person e tasks
      throw new Error('Invalid person or tasks.');
    }
  
    if (task.finishAt) {
      throw new Error('Cannot assign finished task.');
    }
  
    if (person.tasks.some(t => !t.finishAt)) {
      throw new Error('Person already has an active task.');
    }
  
    task.person = person;
    return await this.taskRepository.save(task);
  }
  
  

// listar tarefas por pessoa
  async listTasksByPerson(id: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { person: { id: id } } });
  }

  //listar todas as tarefas
  async listAllTasks(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['person'], order: { finishAt: 'ASC' } });
  }


//finalizar tarefas ativa de ususario
async finishActiveTask(personId: number): Promise<Task> {
  const person = await this.personRepository.createQueryBuilder('person')
    .leftJoinAndSelect('person.tasks', 'task')
    .where('person.id = :id', { id: personId })
    .getOne();

  const activeTask = person.tasks.find(t => !t.finishAt);

  if (!activeTask) {
    throw new Error('Person has no active task.');
  }

  activeTask.finishAt = new Date();
   return await this.taskRepository.save(activeTask);
}

}

