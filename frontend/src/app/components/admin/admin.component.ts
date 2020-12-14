import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../models/index';
import { UserService, AuthService } from '../../services/index';

import 'jquery';
declare var $: JQuery;

declare global {
  interface JQuery {
    (any): JQuery;
    bracket(options: any): JQuery;
  }
}

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {

    constructor(private userService: UserService) { }

    jokes$:Object = [];

    ngOnInit(){
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
