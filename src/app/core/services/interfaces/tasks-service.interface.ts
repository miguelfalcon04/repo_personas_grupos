// src/app/services/interfaces/people.service.interface.ts
import { Task } from '../../models/task.model';
import { IBaseService } from './base-service.interface';

// Interfaz del servicio de tareas, puede hacer todo lo que haga en
// IBaseService sin necesidad de implementarlo y añadir métodos específicos si lo desea
export interface ITasksService extends IBaseService<Task> {
  // Métodos específicos si los hay
}
