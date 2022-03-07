import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-articles-types',
  templateUrl: './all-articles-types.component.html',
  styleUrls: ['./all-articles-types.component.scss']
})
export class AllArticlesTypesComponent implements OnInit {


  name:string;
  CategorieArticles: any;
  pathName:string;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListOfTypes();
  }





  getListOfTypes(){
    this.service.getListOfTypes(this.name).pipe(take(1)).subscribe((data : any)=>{
      this.CategorieArticles = data.listCategorys;
    //  this.pathName = data.name;
     // console.log("aeticless>>>", data.name);
      
     })
  }

  gotoPreviousPage(){
   
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/Alimentaire/' + this.name]);
  }
}
