import { Component, OnInit } from '@angular/core';
import 'jquery';
declare var $: JQuery;

declare global {
  interface JQuery {
    (any): JQuery;
    bracket(options: any): JQuery;
  }
}

@Component({
  selector: 'app-clubfootbal',
  templateUrl: './clubfootbal.component.html',
  styleUrls: ['./clubfootbal.component.css']
})
export class ClubfootbalComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    
  }
}
