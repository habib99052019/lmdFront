import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viande',
  templateUrl: './viande.component.html',
  styleUrls: ['./viande.component.scss']
})
export class ViandeComponent implements OnInit {

  constructor(
     public router: Router
  ) { }

  ngOnInit(): void {
  }


  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/economat/alimentaire'])
  }
}
