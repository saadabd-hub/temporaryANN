import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../../components/admin/admin.component';
import { AddgameComponent } from '../../components/admin/addgame/addgame.component';
import { GetdataComponent } from '../../components/admin/getdata/getdata.component';
import { LurahComponent } from '../../components/admin/lurah/lurah.component';
import { MainComponent } from '../../components/admin/main/main.component';
import { SidbarComponent } from '../../components/admin/sidbar/sidbar.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthGuard } from '../../services/auth/auth.guard';
import { AuthService } from '../../services/auth/auth.service';


@NgModule({
  declarations:
  [
    AdminComponent,AddgameComponent,GetdataComponent,
    GetdataComponent, LurahComponent, MainComponent, SidbarComponent,
  ],
  providers: [AuthGuard, AuthService,],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
