import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagelurahComponent } from '../../components/pagelurah/pagelurah.component';
import { FormaddgameComponent } from '../../components/pagelurah/formaddgame/formaddgame.component';


const routes: Routes = [
  {path:'', component:PagelurahComponent},
  {path:'addgame', component:FormaddgameComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagelurahRoutingModule { }
