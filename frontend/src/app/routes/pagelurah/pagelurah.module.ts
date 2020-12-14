import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagelurahComponent } from '../../components/pagelurah/pagelurah.component';
import { FormaddgameComponent } from '../../components/pagelurah/formaddgame/formaddgame.component';

import { PagelurahRoutingModule } from './pagelurah-routing.module';


@NgModule({
  declarations: [PagelurahComponent, FormaddgameComponent,],
  imports: [
    CommonModule,
    PagelurahRoutingModule
  ]
})
export class PagelurahModule { }
