import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers:[]
})
export class FiltersComponent implements OnInit {
  categories = ['mobiles','laptops']
  brands = ['apple','samsung']
  sortable = ['name','brand','price','category']
  baseUrl = 'http://localhost:3000/api/search/list/';

  brand = null;
  category = null;
  priceFrom = 0;
  priceTo = 10000;
  sortby = name;

  @Output() onDataChange: any = new EventEmitter<boolean>();


  filterObject = {
    query:{},
    sort:{}
  }

   constructor(private http : Http) { }

  ngOnInit() {
    this.http.get(this.baseUrl+'category.name').subscribe( (data: any) => {
      this.categories = JSON.parse(data._body).message
    })
    this.http.get(this.baseUrl+'brand').subscribe( (data: any) => {
      this.brands = JSON.parse(data._body).message
    })
  }
  ngOnChange() {
  }

  itemClick(fieldName: any , value: any ){
    this.filterObject['query'][fieldName] = value
    this.onDataChange.emit(this.filterObject);
  }
  itemRemove(fieldName){
    delete this.filterObject['query'][fieldName]
    this.onDataChange.emit(this.filterObject);
  }
  addSort(fieldName){
    this.filterObject['sort'] = {}
    this.filterObject['sort'] ={
      [fieldName] : 1
    }
    this.onDataChange.emit(this.filterObject);
  }
  removeSort(){
    this.filterObject['sort'] = {}
    this.onDataChange.emit(this.filterObject);
  }
  addPriceFilter(){
    this.filterObject.query['price'] = {
      ['$gte'] : this.priceFrom,
      ['$lte'] : this.priceTo
    }
    this.onDataChange.emit(this.filterObject);
  }
}
