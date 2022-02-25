import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alimentaire',
  templateUrl: './alimentaire.component.html',
  styleUrls: ['./alimentaire.component.scss']
})
export class AlimentaireComponent implements OnInit {

  constructor(
     public router: Router
  ) { }

  ngOnInit(): void {
  }

  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/economat']);
  }
  gotostockPage(){
    
    this.router.navigate(['stock/gestion-stock']);
  }
}
