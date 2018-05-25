import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  categories = [1,2,3,4,5,6,7]
  brands = [1,2,3,4]

  filterObject = {
    price : {
      from: 0,
      to : 1000
    },
    brand : 'apple',
    cat : 'mobile'
  }

  constructor() { }

  ngOnInit() {
  }

}
