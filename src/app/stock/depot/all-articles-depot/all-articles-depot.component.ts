import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-articles-depot',
  templateUrl: './all-articles-depot.component.html',
  styleUrls: ['./all-articles-depot.component.scss']
})
export class AllArticlesDepotComponent implements OnInit {

  DepotArticles: any[]=[];


  constructor(
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
     this.getListOfArticlesByAllDepot();
  }

  getListOfArticlesByAllDepot(){
    this.service.getListOfArticlesByAllDepot().pipe(take(1)).subscribe((data : any)=>{
      this.DepotArticles = data;
   
      console.log("all articles>>>", data);
     
    })
  }

  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock']);
  }


  gotoDepotComponent(name){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + name]);
   }
 
 
   gotoCategorieComponent(name){
     this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/' + name]);
   }

   gotoTypeComponent(name,family){
   // this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.DepotName + '/' + this.name + '/' + family + '/' + name]);
  }
 

  gotoFamilyComponent(depotName,categorieName, familyName){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + depotName + '/' + categorieName + '/' + familyName]);
  }

}
