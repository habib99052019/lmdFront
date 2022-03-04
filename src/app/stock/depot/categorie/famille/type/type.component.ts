import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {

  name:string;
  Types:any;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListOfTypesByFamily();
  }



  getListOfTypesByFamily(){
    this.service.getListOfTypesByFamily(this.name).pipe(take(1)).subscribe((data : any)=>{
      this.Types = data[0].listType;
      console.log("types>>>", data);
      
     })
  }



  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/Economat/Alimentaire']);
  }

  gotoAllTypesComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.name + '/list/familles/all/details/go/spec/types']);
  }

  gotoAllArticlesTypesComponent(){
    this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.name + '/list/familles/all/details/go/spec/full/articles']);
  }
  
  

}
