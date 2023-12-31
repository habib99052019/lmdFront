import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-types',
  templateUrl: './all-types.component.html',
  styleUrls: ['./all-types.component.scss']
})
export class AllTypesComponent implements OnInit {
  name:string;

  ListCategories:any;
  DepotName:string;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListOfTypesByDepot();
  }

  getListOfTypesByDepot(){
    this.service.getListOfTypesByDepot(this.name).pipe(take(1)).subscribe((data : any)=>{
      this.ListCategories = data.listCategorys;
      this.DepotName = data.name;
      console.log("typess>>>", data);
      
     })

  }


  gotoTypeComponent(depotName,categorieName,FamilyName,typeName){
   
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + depotName + '/' + categorieName + '/' + FamilyName + '/' + typeName]);
  }



  gotoPreviousPage(){
   
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/Alimentaire/' + this.name]);
    
  }

  gotoCategorieComponent(name){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/' + name]);
  }

  gotoDepotComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.DepotName]);
  }


}
