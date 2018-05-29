import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SearchService]
})
export class AppComponent implements OnInit {
  data :object = [];
  filter :object = {};

  constructor(private search :SearchService) {  }

  ngOnInit() {
    this.search.getData(this.filter).subscribe( data => {
      this.data = JSON.parse(data._body).message
    })
  }
  registerFilter(value){
    if(typeof value === 'object'){
      this.filter = value
    }

    this.search.getData(this.filter).subscribe( data => {
      this.data = JSON.parse(data._body).message
    })
  }
  addQuery(value){
    if(!this.filter.query){
      this.filter.query = {}
    }
    if(value == ""){
      delete this.filter.query['$text']
    }else{
      this.filter.query['$text'] = {
        ['$search']:value
      };
    }
    console.log(this.filter   )
    this.search.getData(this.filter).subscribe( data => {
      this.data = JSON.parse(data._body).message
    })
  }
}
