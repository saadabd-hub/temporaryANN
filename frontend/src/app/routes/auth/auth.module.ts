import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SignComponent } from '../../components/sign/sign.component';
import { SignupComponent } from '../../components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user.service';
import { AuthGuard } from '../../services/auth/auth.guard';
import { AuthInterceptor } from '../../services/auth/auth.interceptor';
import { NotifregisterComponent } from '../../components/notifregister/notifregister.component';



@NgModule({
  declarations: [
    SignComponent,
    NotifregisterComponent,
    SignupComponent
  ],
  imports: [
    AuthRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [ AuthGuard, AuthService, UserService],
})
export class AuthModule { }
