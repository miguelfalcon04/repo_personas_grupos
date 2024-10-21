// src/app/services/interfaces/people.service.interface.ts
import { Person } from '../../models/person.model';
import { IBaseService } from './base-service.interface';

// Interfaz del servicio de personas, puede hacer todo lo que haga en
// IBaseService sin necesidad de implementarlo y añadir métodos específicos si lo desea
export interface IPeopleService extends IBaseService<Person> {
  // Métodos específicos si los hay
}
