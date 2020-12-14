import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from '../../../components/board/board.component';
import { PlayerComponent } from '../../../components/board/player/player.component';
import { BracketComponent } from '../../../components/board/bracket/bracket.component';
import { BigmatchComponent } from '../../../components/board/bigmatch/bigmatch.component';
import { MatchdayComponent } from '../../../components/board/matchday/matchday.component';

const routes: Routes = [
  {path:'', component:BoardComponent,},
  {path:'bracket', component:BracketComponent,},
  {path:'player', component:PlayerComponent,},
  {path:'bigmatch', component:BigmatchComponent},
  {path:'matchday', component:MatchdayComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
