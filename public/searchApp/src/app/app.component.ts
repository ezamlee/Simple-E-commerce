import { Component } from '@angular/core';
import * as $ from 'jquery';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  data = [1,2,3,4,5,6,7,8,9,10,11];

  constructor() { }
  ngOnInit() {

  }
}
