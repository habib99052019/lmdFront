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
       this.Articles = data[0].listArticle;
       this.articleName = data[0].name;
      console.log("types>>>", data);
      
     })

  }

  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/Alimentaire/Viandes']);
  }

}
