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
  selector: 'app-pagelurah',
  templateUrl: './pagelurah.component.html',
  styleUrls: ['./pagelurah.component.css']
})
export class PagelurahComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {
      $('#example').DataTable( {
    columnDefs: [ {
        targets: [ 0 ],
        orderData: [ 0, 1 ]
    }, {
        targets: [ 1 ],
        orderData: [ 1, 0 ]
    }, {
        targets: [ 4 ],
        orderData: [ 4, 0 ]
    } ]
} );
} );
  }

}
