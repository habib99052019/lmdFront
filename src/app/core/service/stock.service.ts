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
  return this.http.get(this.ApiPath + '/categories/depot?name=' + name )
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

//get list categories by all depots
getListOfCategorieByAllDepot(){
  return this.http.get(this.ApiPath + '/depots/categories')
}

//get list articles by all depots
getListOfArticlesByAllDepot(){
  return this.http.get(this.ApiPath + '/depots/categories/familys/types/articles')
}


//get list articles by categorie
getListOfArticlesByCategorie(name){
  return this.http.get(this.ApiPath + '/depots/articles?name=' + name )
}



//get list familys by depot
getListOfFamilyByDepot(name){
  return this.http.get(this.ApiPath + '/depots/family/all?name=' + name )
}



//get list articles by family
getListOfArticlesByFamily(name){
  return this.http.get(this.ApiPath + '/depots/articles/categorie?name=' + name )
}


//get list types by depot
getListOfTypesByDepot(name){
  return this.http.get(this.ApiPath + '/depots/types/family?name=' + name )
}


//get list types by depot //all articles type
getListOfTypes(name){
  return this.http.get(this.ApiPath + 'depots/types/family/articles?name=' + name )
}

//get list articles  by name
getListOfArticlesByName(name){
  return this.http.get(this.ApiPath + 'articles?name=' + name )
}

//create new course
CreateNewCourse(course : any){
  return this.http.post(this.ApiPath + 'courses', course)
}

//get list of courses
getListCourse(){
  return this.http.get(this.ApiPath + 'courses');
}
//get list of courses by date range
getListCourseByDateRange(from, to){
  return this.http.get(this.ApiPath + 'courses?from=' + from + '&to=' + to) ;
}



}
