// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GroupRepositoryFactory, PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { PeopleService } from './core/services/impl/people.service';
import { GROUPS_API_URL_TOKEN, GROUP_RESOURCE_NAME_TOKEN, GROUPS_REPOSITORY_MAPPING_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { provideHttpClient } from '@angular/common/http';
import { PeopleLocalStorageMapping } from './core/repositories/impl/people-mapping-local-storage.service';
import { PeopleMappingJsonServer } from './core/repositories/impl/people-mapping-json-server.service';
import { GroupMappingJsonServer } from './core/repositories/impl/group-mapping-json-server.service';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonModalComponent } from './components/person-modal/person-modal.component';
import { GroupSelectableComponent } from './components/group-selectable/group-selectable.component';
import { GroupsMappingStrapi } from './core/repositories/impl/groups-mapping-strapi.service';
import { PeopleMappingStrapi } from './core/repositories/impl/people-mapping-strapi.service';

@NgModule({
  declarations: [AppComponent, PersonModalComponent, GroupSelectableComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),

    { provide: PEOPLE_RESOURCE_NAME_TOKEN, useValue: 'people' },
    { provide: GROUP_RESOURCE_NAME_TOKEN, useValue: 'groups' },
    { provide: PEOPLE_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    { provide: GROUPS_API_URL_TOKEN, useValue: 'http://localhost:1337/api' },
    // Registrar los repositorios
    {
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN,
      useClass: PeopleMappingStrapi
    },
    {
      provide: GROUPS_REPOSITORY_MAPPING_TOKEN,
      useClass: GroupsMappingStrapi
    },
    PeopleRepositoryFactory,
    GroupRepositoryFactory,
    // Registrar otros repositorios según sea necesario
    // Servicios de aplicación
    {
      provide: 'PeopleService',
      useClass: PeopleService
    }
  ],
  // ... otros proveedores],
  bootstrap: [AppComponent],
})
export class AppModule {}
