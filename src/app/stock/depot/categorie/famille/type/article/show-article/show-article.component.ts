import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.scss']
})
export class ShowArticleComponent implements OnInit {
 id:string;
 article:any;
 currentUrl:string;
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id>>>>", this.id);
    this.getArticleById();
    console.log(window.location.href)
    this.currentUrl = window.location.href;
    console.log("url>>>>", this.currentUrl);
    

  }



  getArticleById(){
    this.service.getArticleById(this.id).pipe(take(1)).subscribe((data : any)=>{
           console.log("article>>>",data);
           this.article = data;
           
    })
  }
}
