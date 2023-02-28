import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { Task } from '../entities/task.entity';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  async createTask(@Body() taskData: Task): Promise<Task> {
    return this.taskService.createTask(taskData);
  }

  @Put(':id')
  async assignTaskToPerson(@Param('id') id: number, @Body() taskId: number): Promise<Task> {
    return this.taskService.assignTaskToPerson(id, taskId);
  }

  @Get(':id/person')
  async listTasksByPerson(@Param('id') id: number): Promise<Task[]> {
    return this.taskService.listTasksByPerson(id);
  }

  @Get()
  async listAllTasks(): Promise<Task[]> {
    return this.taskService.listAllTasks();
  }

  @Put(':id/finish')
  async finishActiveTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.finishActiveTask(id);
  }
}

