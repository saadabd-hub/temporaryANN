import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { TokenStorageService } from '../../services/auth/token-storage.service';


@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css']
})
export class SignComponent implements OnInit {

  loginData = {
    email:'',
    password:''
  }
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService:AuthService, private router:Router, private tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
  }
  signinUser(){
    this.authService.signinUser(this.loginData)
    .subscribe(
      res =>{
      console.log(res)
      localStorage.setItem('token', res.access_token)
      res => this.reloadPage();
    },
    )
  }
  reloadPage():void{
    window.location.reload();
  }

  }
