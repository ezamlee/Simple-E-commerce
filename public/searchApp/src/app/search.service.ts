import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient,
  ){

  }

  addAND(baseUrl :string) :string  {
    if([',','?','&'].indexOf(baseUrl.substr[baseUrl.length - 1]) == -1){
      baseUrl += '&';
    }
    return baseUrl
  }

  baseUrlFinal = 'http://localhost.3000/api/search?';

  getData(filterObject: Object) :Observable<Object> {
    let baseUrl = this.baseUrlFinal;

    if(filterObject['q'] && typeof filterObject['q'] == 'string'){
      baseUrl += `q=${filterObject['q']}`
    }

    if(filterObject['skip']){
      baseUrl = this.addAND(baseUrl);
      baseUrl+=`skip=${filterObject['skip']}`
    }

    if(filterObject['sort']){
      baseUrl = this.addAND(baseUrl);
      baseUrl+="sort="
      baseUrl += Object
                  .keys(filterObject['sort'])
                  .reduce( (baseUrl , fieldName)=>{
                    return `${baseUrl}${fieldName}|${filterObject['sort']['fieldName']||1},`
                  },baseUrl)
    }

    if(filterObject['limit']){
      baseUrl = this.addAND(baseUrl);
      baseUrl+="limit="
      baseUrl+= Object
                  .keys(filterObject['limit'])
                  .reduce((baseUrl , fieldName)=>{
                    return `${baseUrl}${fieldName}|${filterObject['limit']['fieldName'][0]}|${filterObject['limit']['fieldName'][1]},`
                  },baseUrl)

    }


    if(filterObject['filter']){
      // filter : {
      //   fieldName : value
      // }

      baseUrl = this.addAND(baseUrl);
      baseUrl += 'filter='
      baseUrl += Object.keys(filterObject['filter']).reduce( (baseUrl,fieldName) => {
        return `${fieldName}|${filterObject['filter']['fieldName']},`
      })
    }
    return this.http.get<Object>(baseUrl);
  }
}
