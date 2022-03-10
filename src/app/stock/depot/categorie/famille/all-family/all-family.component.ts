import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-all-family',
  templateUrl: './all-family.component.html',
  styleUrls: ['./all-family.component.scss']
})
export class AllFamilyComponent implements OnInit {
  
  name:string;
  Listfamilles:any;
  DepotName:any;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListOfFamilyByDepot();
  }

  getListOfFamilyByDepot(){
    this.service.getListOfFamilyByDepot(this.name).pipe(take(1)).subscribe((data : any)=>{
        this.Listfamilles = data.listCategorys;
        this.DepotName = data.name;
        console.log("familles>>>", data);
        
       })
  
    }
  
  


  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/' + this.name]);
  }

  gotoTypeComponent(name){
    console.log("namme vers>>>",name);
    
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/Alimentaire/' + name]);
  }

  
  
  gotoAllDepotComponent(){
    this.router.navigate(['stock/gestion-stock']);
  }

  
  gotoDepotComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.DepotName]);
  }

  gotoCategorieComponent(name){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/' + name]);
  }


}
