import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogreservationn-infos',
  templateUrl: './dialogreservationn-infos.component.html',
  styleUrls: ['./dialogreservationn-infos.component.scss']
})
export class DialogreservationnInfosComponent implements OnInit {



  title = '';
  firstName = '';
  lastName = '';
  start = '';
  end = '';
  nbp=0;
  isReserve = 0;
  isOccupe = 0;
  isFermer = 0
  last = '';



constructor(
    public dialogRef: MatDialogRef<DialogreservationnInfosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any ,
     public _router:Router) { }

ngOnInit(): void {

    console.log('data>>>', this.data)
    this.firstName = this.data['firstName'];
    this.lastName= this.data['lastName'];
    this.isReserve = this.data['isReserve'];
    this.isOccupe = this.data['isOccupe'];
    this.isFermer = this.data['isFermer'];
    this.title = this.data['title']
    this.nbp = this.data['nbp'];
    this.start = this.data['start'],
    this.end = this.data['end']
    this.last = this.data['last']

    if(this.data['isReserve'] === true){
      this.isReserve = 1;
   }
   else if(this.data['isReserve'] === false){
     this.isReserve = 0;
   }
   
   else if(this.data['isOccupe'] === true){
     this.isOccupe = 1;
   }
   else if(this.data['isOccupe'] === false){
    this.isOccupe = 0;
  }
  else if(this.data['isFermer'] === true){
    this.isOccupe = 1;
  }
   else if(this.data['isFermer'] === false){
    this.isOccupe = 0;
  }
}


  
gotoReservation(){
    this._router.navigate(["reservation/reserver/"+String(`${this.last}`)])
}



}
