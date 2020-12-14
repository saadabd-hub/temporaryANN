import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
// declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(){

    // $("span").css("color","red");
  }

}
