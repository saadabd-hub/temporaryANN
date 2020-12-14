import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypegamesComponent } from '../../components/typegames/typegames.component';
import { FreeforallComponent } from '../../components/typegames/freeforall/freeforall.component';
import { IndividualsComponent } from '../../components/typegames/individuals/individuals.component';

const routes: Routes = [TypegamesComponent,FreeforallComponent,IndividualsComponent,];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypegameRoutingModule { }
