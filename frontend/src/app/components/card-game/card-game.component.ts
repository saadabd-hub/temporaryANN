import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GamesService } from '../../services/games.service';
import { Games } from '../../models/games';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent implements OnInit {

  gameslist:Games[];
  constructor(private gamesService:GamesService, private http:HttpClient) {

  }

  ngOnInit(): void {


    this.gamesService.getGame()
    .subscribe(
      data=>
      {
        this.gameslist = data;
      }
    )
  }



}
