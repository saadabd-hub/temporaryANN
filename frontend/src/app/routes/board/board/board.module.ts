import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketComponent } from '../../../components/board/bracket/bracket.component';
import { TeamallComponent } from '../../../components/board/teamall/teamall.component';
import { PlayerComponent } from '../../../components/board/player/player.component';
import { BoardComponent } from '../../../components/board/board.component';
import { BigmatchComponent } from '../../../components/board/bigmatch/bigmatch.component';
import { MatchdayComponent } from '../../../components/board/matchday/matchday.component';
import { OpengameComponent } from '../../../components/opengame/opengame.component';
import { TournamentMatchComponent } from '../../../components/board/tournament-match/tournament-match.component';


import { BoardRoutingModule } from './board-routing.module';



@NgModule({
  declarations: [
    TeamallComponent,
    BracketComponent,
    PlayerComponent,
    BoardComponent,
    BigmatchComponent,
    OpengameComponent,
    TournamentMatchComponent,
    MatchdayComponent
    ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
