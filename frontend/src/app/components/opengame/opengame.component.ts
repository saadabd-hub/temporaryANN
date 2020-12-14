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
  selector: 'app-opengame',
  templateUrl: './opengame.component.html',
  styleUrls: ['./opengame.component.css']
})
export class OpengameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function(){
	$(".collapse.show").each(function(){
		$(this).siblings(".card-header").find(".btn i").html("remove");
	});

	$(".collapse").on('show.bs.collapse', function(){
		$(this).parent().find(".card-header .btn i").html("remove");
	}).on('hide.bs.collapse', function(){
		$(this).parent().find(".card-header .btn i").html("add");
	});
});
  }

}
