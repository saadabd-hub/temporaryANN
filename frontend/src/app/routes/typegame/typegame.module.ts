import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypegamesComponent } from '../../components/typegames/typegames.component';
import { FreeforallComponent } from '../../components/typegames/freeforall/freeforall.component';
import { IndividualsComponent } from '../../components/typegames/individuals/individuals.component';

import { TypegameRoutingModule } from './typegame-routing.module';


@NgModule({
  declarations: [TypegamesComponent, FreeforallComponent,
  IndividualsComponent,],
  imports: [
    CommonModule,
    TypegameRoutingModule
  ]
})
export class TypegameModule { }
