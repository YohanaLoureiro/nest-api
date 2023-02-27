import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async create(@Body() taskData: Task): Promise<Task> {
    return this.taskService.create(taskData);
  }

  @Put(':id')
  async assign(@Param('id') id: number, @Body() taskId: number): Promise<Task> {
    return this.taskService.assign(id, taskId);
  }

  @Get(':id/person')
  async findByPerson(@Param('id') id: number): Promise<Task[]> {
    return this.taskService.findByPerson(id);
  }

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Put(':id/finish')
  async finish(@Param('id') id: number, @Body() finishDate: Date): Promise<Task> {
    return this.taskService.finish(id, finishDate);
  }
}

