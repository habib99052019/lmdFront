import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {

  name:string;
  Categories:any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
   let name = this.route.snapshot.paramMap.get("name");
    this.service.getListCategoryByDepot(name).pipe(take(1)).subscribe((data : any)=>{
      this.Categories = data[0].listCategorys;
      console.log("categories>>>", this.Categories);
      
   })
  }


  
 /* getListCategoryByDepot(){
    this.service.getListCategoryByDepot(this.name).pipe(take(1)).subscribe((data : any)=>{
        this.Categories = data[0].listCategorys;
        console.log("categories>>>", this.Categories);
        
       })
  
    }*/
  



  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock']);
  }
  

}
