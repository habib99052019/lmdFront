import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nettoyage',
  templateUrl: './nettoyage.component.html',
  styleUrls: ['./nettoyage.component.scss']
})
export class NettoyageComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
  
  gotoPreviousPage(){
    this.router.navigate(['stock/gestion-stock/economat'])
  }
}
