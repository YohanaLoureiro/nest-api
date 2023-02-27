import { Controller, Post, Body } from '@nestjs/common';
import { PersonService } from '../service/person.service';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Post()
  async create(@Body() personData: Person): Promise<Person> {
    return this.personService.create(personData);
  }
}
