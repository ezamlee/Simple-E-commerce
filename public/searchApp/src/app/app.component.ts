import { HttpClient } from '@angular/common/http';
import { SearchService } from './search.service';
import { Component } from '@angular/core';
import * as $ from 'jquery';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data :object = [];
  filter :object = {};

  constructor(private search :SearchService) {  }
  
  ngOnInit() {
    this.search.getData({}).subscribe( data => {
      this.data = data;
    })
  }

  
}
