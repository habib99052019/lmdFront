import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss']
})
export class AllArticlesComponent implements OnInit {

  name:string;
  Categories:any;
  DepotName:string;
  
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListOfArticlesByFamily()
  }


  
  getListOfArticlesByFamily(){
    this.service.getListOfArticlesByFamily(this.name).pipe(take(1)).subscribe((data : any)=>{
      this.Categories = data.listCategorys;
      this.DepotName = data.name;
      console.log("new articles>>>", data);
      
     })
  }


  gotoPreviousPage(){
    
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/' + this.name]);
  }

  gotoDepotComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.DepotName]);
  }


  gotoCategorieComponent(name){
    this.router.navigate(['stock/gestion-stock/depot/categorie/'+ this.DepotName + '/' + name]);
  }

  
  gotoTypeComponent(name,family){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.DepotName + '/' + this.name + '/' + family + '/' + name]);
  }
 

  gotoFamilyComponent(name){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.DepotName + '/' + this.name + '/' + name]);
  }

}
