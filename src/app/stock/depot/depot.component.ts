import { Component, OnInit } from '@angular/core';
import { take } from "rxjs/operators";
import { StockService } from "src/app/core/service/stock.service";

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.scss']
})
export class DepotComponent implements OnInit {


 Depots:any;


  constructor(
      private service: StockService
  ) { }

  ngOnInit(): void {
    this.getListDepots();
  }




  getListDepots(){
  this.service.getListDepots().pipe(take(1)).subscribe((data : any)=>{
      this.Depots = data;
      console.log("depots>>>", data);
      
     })

  }

}
