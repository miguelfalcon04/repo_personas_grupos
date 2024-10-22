// src/app/services/impl/people.service.ts
import { Injectable, Inject } from '@angular/core';
import { BaseService } from './base-service.service';
import { GROUP_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { Group } from '../../models/group.model';
import { IGroupRepository } from '../../repositories/intefaces/group-repository.interface';
import { IGroupService } from '../interfaces/group-service.interface';

// Indica que el servicio será un Singleton, solo habrá una instancia de él
@Injectable({
  providedIn: 'root'
}) // Hereda BaseService y lo parametriza para trabajar con Group
export class GroupService extends BaseService<Group> implements IGroupService {
  constructor( // Inyecta el repositorio IGroupRepository
    @Inject(GROUP_REPOSITORY_TOKEN) repository: IGroupRepository
  ) {
    super(repository); // Constructor de BaseService
  }

  // Implementa métodos específicos si los hay
}
