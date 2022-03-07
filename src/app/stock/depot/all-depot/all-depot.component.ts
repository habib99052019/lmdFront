import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-depot',
  templateUrl: './all-depot.component.html',
  styleUrls: ['./all-depot.component.scss']
})
export class AllDepotComponent implements OnInit {


  DepotCategories: any[]=[];


  constructor(
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.getListOfCategorieByAllDepot();
  }



  getListOfCategorieByAllDepot(){
    this.service.getListOfCategorieByAllDepot().pipe(take(1)).subscribe((data : any)=>{
      this.DepotCategories = data;
   
      console.log("all categories>>>", data);
     
    })
  }


  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock']);
  }
  
  gotoAllCategorieDepotComponent(){
    this.router.navigate(['stock/gestion-stock/depot/articles']);
  }

  gotoAllDepotComponent(){
    this.router.navigate(['stock/gestion-stock/depot/tous']);
  }
}
