// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { IPeopleService } from '../interfaces/people-service.interface';
import { Person } from '../../models/person.model';
import { PEOPLE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { IPeopleRepository } from '../../repositories/intefaces/people-repository.interface';

// Indica que el servicio será un Singleton, solo habrá una instancia de él
@Injectable({
  providedIn: 'root'
}) // Hereda BaseService y lo parametriza para trabajar con Person
export class PeopleService extends BaseService<Person> implements IPeopleService {
  constructor( // Inyecta el repositorio IPeopleRepository
    @Inject(PEOPLE_REPOSITORY_TOKEN) repository: IPeopleRepository
  ) {
    super(repository); // Constructor de BaseService
  }

  // Implementa métodos específicos si los hay
}
