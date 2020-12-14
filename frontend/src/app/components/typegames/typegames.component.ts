import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-typegames',
  templateUrl: './typegames.component.html',
  styleUrls: ['./typegames.component.css']
})
export class TypegamesComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    $(document).ready(function() {
    $('#autoWidth').lightSlider({
       autoWidth:true,
       loop:true,
       onSliderLoad: function() {
           $('#autoWidth').removeClass('cS-hidden');
       }
   });
 });
  }

}
