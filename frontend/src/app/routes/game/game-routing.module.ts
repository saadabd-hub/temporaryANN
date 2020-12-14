import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListgameComponent } from '../../components/games/listgame/listgame.component';
import { PopulerComponent } from '../../components/games/populer/populer.component';


const routes: Routes = [
  {path:'', component:ListgameComponent},
  {path:'populergame', component:PopulerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
