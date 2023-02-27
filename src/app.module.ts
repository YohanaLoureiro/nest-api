import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './controller/person.controller';
import { PersonService } from './service/person.service';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { Person } from './entities/person.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Person, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person, Task]),
  ],
  controllers: [AppController, PersonController, TaskController],
  providers: [AppService, PersonService, TaskService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
