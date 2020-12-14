import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate} from '@angular/router';
import { Role  } from './models/index';
import { CommentComponent } from './components/comment/comment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotifregisterComponent } from './components/notifregister/notifregister.component';

import { HomeComponent } from './components/home/home.component';
import { TeamallComponent } from './components/board/teamall/teamall.component';
import { PopulerComponent } from './components/games/populer/populer.component';
import { DetailgameComponent } from './components/detailgame/detailgame.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'team', component:TeamallComponent },
  {path:'populer', component:PopulerComponent},
  {path:'detailgame', component:DetailgameComponent,},
  {path:'profile', component:ProfileComponent},
  {path:'notif', component:NotifregisterComponent},
  // {path: 'admin', loadChildren: () => import('./routes/admin/admin.module').then(m => m.AdminModule),
  //  canActivate: [AuthGuard],data: {userRoles: [Roles.ADMIN,]} },
  {path:'admin', loadChildren: () => import('./routes/admin/admin.module').then(m => m.AdminModule)},
  {path:'lurah', loadChildren: () => import('./routes/pagelurah/pagelurah.module') .then(m => m.PagelurahModule)},
  {path:'panitia', loadChildren: () => import('./routes/panitia/panitia.module') .then(m => m.PanitiaModule)},
  {path:'comment',loadChildren: () =>import('./routes/comment/comment.module').then(m => m.CommentModule)},
  {path: 'sign',loadChildren: () =>import('./routes/auth/auth.module').then(m => m.AuthModule)},
  {path: 'board',loadChildren: () =>import('./routes/board/board/board.module').then(m => m.BoardModule)},
  {path: 'pubg',loadChildren: () =>import('./routes/board/games/games.module').then(m => m.GamesModule)},
  {path: 'listgame',loadChildren: () =>import('./routes/board/games/games.module').then(m => m.GamesModule)},
  {path: 'pagelurah',loadChildren: () =>import('./routes/pagelurah/pagelurah.module').then(m => m.PagelurahModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
