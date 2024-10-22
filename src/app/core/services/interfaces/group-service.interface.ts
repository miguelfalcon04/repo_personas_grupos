// src/app/services/interfaces/people.service.interface.ts
import { Group } from '../../models/group.model';
import { IBaseService } from './base-service.interface';

// Interfaz del servicio de personas, puede hacer todo lo que haga en
// IBaseService sin necesidad de implementarlo y añadir métodos específicos si lo desea
export interface IGroupService extends IBaseService<Group> {
  // Métodos específicos si los hay
}
