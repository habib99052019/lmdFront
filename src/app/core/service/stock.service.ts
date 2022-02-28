import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  ApiPath = environment.API ;


  constructor(private http : HttpClient) { }


  // get list of all depots
  getListDepots(){
    return this.http.get(this.ApiPath + 'depots');
  }

  // get list of all categorys by depot
 getListCategoryByDepot(name){
  return this.http.get(this.ApiPath + '/categories/articles/depot?name=' + name )
 }


}
