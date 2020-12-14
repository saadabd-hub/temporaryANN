import { Component, OnInit } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-teamall',
  templateUrl: './teamall.component.html',
  styleUrls: ['./teamall.component.css']
})
export class TeamallComponent implements OnInit {


  constructor() { }

  public ngOnInit(){

      $('#draggable-move').draggable({
      cursor: "move"
      });

      $('#draggable-pointer').draggable({
      cursor: "pointer",
      cursorAt: { top: -5, left: -5 }
      });

      $('#draggable-crosshair').draggable({
      cursor: "crosshair",
      cursorAt: { bottom: 0 }
      });
  }

}
