import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
declare var $:any
declare var jQuery: any;

@Component({
  selector: 'app-contactjoin',
  templateUrl: './contactjoin.component.html',
  styleUrls: ['./contactjoin.component.css']
})
export class ContactjoinComponent implements OnInit {

  // validatingForm: FormGroup;
  constructor() { }

  ngOnInit(){
    $( function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
  } );
  }


}
