import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
   
  name:string;
  Articles:any;
  articleName:string;
  pathName:string;
  categorieName:string;
  depotName:string;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListOfArticlesByType();
  }




  getListOfArticlesByType(){
    this.service.getListOfArticlesByType(this.name).pipe(take(1)).subscribe((data : any)=>{
      console.log("types222>>>", data);
       this.Articles = data[0].listArticle;
       this.articleName = data[0].name;
       this.pathName = data[0].idFamily.name;
       this.categorieName = data[0].idFamily.idCategory.name;
       this.depotName = data[0].idFamily.idCategory.idDepot.name;
      
      
     })

  }

  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/Alimentaire/' + this.pathName]);
  }

  gotoshowArticle(id){
   // stock/gestion-stock/depot/tous/Alimentaire/Viandes/Agneau/show/621ca0e5f5b4d351088c28a1
    this.router.navigate(['stock/gestion-stock/depot/categorie/tous/'+ this.categorieName + '/' + this.pathName + '/' + this.articleName + '/show/' + id]);
  }

  
  gotoCategorieComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/' + this.categorieName]);
  }



  gotoAllDepotComponent(){
    this.router.navigate(['stock/gestion-stock']);
  }

  
  gotoDepotComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.depotName]);

  }
}
