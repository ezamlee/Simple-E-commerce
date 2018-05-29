import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http : Http,
  ){

  }

  addAND(baseUrl :string) :string  {0
    if([',','?','&'].indexOf(baseUrl.substr[baseUrl.length - 1]) == -1){
      baseUrl += '&';
    }
    return baseUrl
  }

  baseUrlFinal = 'http://localhost:3000/api/search?';

  getData(filterObject: Object) :any {
    return this.http.get(this.baseUrlFinal+`data=${JSON.stringify(filterObject)}`);
  }
}
