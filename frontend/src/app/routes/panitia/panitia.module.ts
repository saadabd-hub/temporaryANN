import { NgModule } from '@angular/core';
import { PanitiaComponent } from '../../components/panitia/panitia.component';
import { CommonModule } from '@angular/common';import { PanitiaRoutingModule } from './panitia-routing.module';
import { AddgameComponent } from '../../components/panitia/addgame/addgame.component';
import { AddparticipanComponent } from '../../components/panitia/addparticipan/addparticipan.component';
import { AddruleComponent } from '../../components/panitia/addrule/addrule.component';


@NgModule({
  declarations: [ PanitiaComponent,AddgameComponent, AddparticipanComponent, AddruleComponent],
  imports: [
    CommonModule,
    PanitiaRoutingModule
  ]
})
export class PanitiaModule { }
