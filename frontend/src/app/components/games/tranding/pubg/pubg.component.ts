import { Component, OnInit } from '@angular/core';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
// For MDB Angular Free
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';

@Component({
  selector: 'app-pubg',
  templateUrl: './pubg.component.html',
  styleUrls: ['./pubg.component.css']
})
export class PubgComponent implements OnInit {

  constructor(private carouselModule:CarouselModule, private wavesModule:WavesModule ) { }

  ngOnInit(): void {
  }

}
