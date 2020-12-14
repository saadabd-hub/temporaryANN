import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PubgComponent } from '../../../components/games/tranding/pubg/pubg.component';
import { ListgameComponent } from '../../../components/games/listgame/listgame.component';

import { GamesRoutingModule } from './games-routing.module';


@NgModule({
  declarations: [
    PubgComponent,
    ListgameComponent],
  imports: [
    CommonModule,
    GamesRoutingModule
  ]
})
export class GamesModule { }
