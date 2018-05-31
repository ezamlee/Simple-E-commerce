import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  query = "";
  constructor() { }

  ngOnInit() {
  }
  @Output() onQuery: any = new EventEmitter<boolean>();

  submitQuery(){
    this.onQuery.emit(this.query);
  }
  keyDownFunction(event) {
  if(event.keyCode == 13) {
    this.onQuery.emit(this.query);
  }
}

}
