import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PubgComponent } from '../../../components/games/tranding/pubg/pubg.component';
import { ListgameComponent } from '../../../components/games/listgame/listgame.component';


const routes: Routes = [
  {path:'', component:ListgameComponent,},
  {path:'pubg', component:PubgComponent,},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
