import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StockService } from 'src/app/core/service/stock.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {

  name:string;
  Familles:any;
  pathName:string;


  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private service: StockService
  ) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get("name");
    console.log("name>>>>", this.name);
    this.getListFamilyByCategorie();
    
  }


  getListFamilyByCategorie(){
    this.service.getListFamilyByCategorie(this.name).pipe(take(1)).subscribe((data : any)=>{
        this.Familles = data[0].listFamily;
        this.pathName = data[0].idDepot.name;
        console.log("familles>>>", data);
        
       })
  
    }
  

    gotoPreviousPage(){
      this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.pathName]);
    }

    gotoAllFamilyByDepotComponent(){
      this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.name + '/list/familles/all/details/go']);
    }


    gotoAllArticlesComponent(){
      this.router.navigate(['stock/gestion-stock/depot/categorie/' + this.name + '/list/familles/all/details/go/articles']);
    }


    gotoDepotComponent(){
      this.router.navigate(['stock/gestion-stock']);
  
    }
}
