import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-economat',
  templateUrl: './economat.component.html',
  styleUrls: ['./economat.component.scss']
})
export class EconomatComponent implements OnInit {

  constructor(
      public router: Router
  ) { }

  ngOnInit(): void {
  }


  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock'])
  }

}
