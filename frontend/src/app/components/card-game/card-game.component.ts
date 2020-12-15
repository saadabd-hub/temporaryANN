import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GamesService } from '../../services/games.service';
import { Games } from '../../models/games';

@Component({
  selector: 'app-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.css']
})
export class CardGameComponent implements OnInit, OnChanges{
  title = 'angular-text-search-highlight';
  searchText = '';
  characters = [];
  @Input() totalRecords = 0;  
  @Input() recordsPerPage = 0;  
  
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();
  public pages: number [] = [];  
  activePage: number; 
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
  ngOnChanges(): any {  
    const pageCount = this.getPageCount();  
    this.pages = this.getArrayOfPage(pageCount);  
    this.activePage = 1;  
    this.onPageChange.emit(1);  
  }  

  private  getPageCount(): number {  
    let totalPage = 0;  

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {  
      const pageCount = this.totalRecords / this.recordsPerPage;  
      const roundedPageCount = Math.floor(pageCount);  

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;  
    }  

    return totalPage;  
  }  

  private getArrayOfPage(pageCount: number): number [] {  
    const pageArray = [];  

    if (pageCount > 0) {  
        for(let i = 1 ; i <= pageCount ; i++) {  
          pageArray.push(i);  
        }  
    }  

    return pageArray;  
  }  

  onClickPage(pageNumber: number): void {  
      if (pageNumber >= 1 && pageNumber <= this.pages.length) {  
          this.activePage = pageNumber;  
          this.onPageChange.emit(this.activePage);  
      }  
  }  



}
