import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListgameComponent } from '../../components/games/listgame/listgame.component';
import { PopulerComponent } from '../../components/games/populer/populer.component';

import { GameRoutingModule } from './game-routing.module';


@NgModule({
  declarations: [ListgameComponent, PopulerComponent],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
