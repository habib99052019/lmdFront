import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-articles-categorie',
  templateUrl: './all-articles-categorie.component.html',
  styleUrls: ['./all-articles-categorie.component.scss']
})
export class AllArticlesCategorieComponent implements OnInit {

  CategorieArticles: any[]=[];
  name:string;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log('name>>>', this.name);
    this.getListOfArticlesByCategorie();
    
  }


  getListOfArticlesByCategorie(){
    this.service.getListOfArticlesByCategorie(this.name).pipe(take(1)).subscribe((data : any)=>{
      this.CategorieArticles = data;
   
      console.log("all articles>>>", data);
     
    })
  }




  gotoPreviousPage(){
    this.router.navigate(['/stock/gestion-stock/depot/categorie/'+this.name]);
  }

  gotoAllDepotComponent(){
    this.router.navigate(['stock/gestion-stock']);
  }
}
