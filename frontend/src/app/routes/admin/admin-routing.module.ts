import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from '../../components/admin/admin.component';
import { AddgameComponent } from '../../components/admin/addgame/addgame.component';
import { GetdataComponent } from '../../components/admin/getdata/getdata.component';
import { LurahComponent } from '../../components/admin/lurah/lurah.component';
import { SidbarComponent } from '../../components/admin/sidbar/sidbar.component';


const routes: Routes = [
  {path:'', component:AdminComponent},
  {path:'addgame', component:AddgameComponent},
  {path:'getdata', component:GetdataComponent},
  {path:'lurah', component:LurahComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
