import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonasPageRoutingModule } from './people-routing.module';

import { SharedModule } from '../shared/shared.module';
import { PeoplePage } from './people.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonasPageRoutingModule,
    SharedModule
  ],
  declarations: [PeoplePage]
})
export class PeoplePageModule {}
