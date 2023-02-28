import { Controller, Post, Body } from '@nestjs/common';
import { PersonService } from '../service/person.service';
import { Person } from '../entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private personService: PersonService) {}

  @Post()
  async createPerson(@Body() personData: Person): Promise<Person> {
    return this.personService.createPerson(personData);
  }
}
