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

// get list of all family by category
getListFamilyByCategorie(name){
  return this.http.get(this.ApiPath + '/categories?name=' + name )
}

// get list of all family by category
getListOfTypesByFamily(name){
  return this.http.get(this.ApiPath + '/categories/family?name=' + name )
}

//get list articles by type
getListOfArticlesByType(name){
  return this.http.get(this.ApiPath + '/categories/family/type?name=' + name )
}


}
