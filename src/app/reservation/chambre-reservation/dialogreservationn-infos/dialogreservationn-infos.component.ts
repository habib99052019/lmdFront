import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';

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
  isReserve = 1;
  isOccupe = 0;
  isFermer = 0
  last = '';
  nb_days = 0;
  nb_children = 0;
  price = 0; 
  roomID = '';
  status_room = 0;
  selected = 0;
  reservation_ID = '';

constructor(
    public dialogRef: MatDialogRef<DialogreservationnInfosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
     public _router:Router,
     public _reservationService:ReservationServiceService,
     private snackBar: MatSnackBar
     ) { }

ngOnInit(): void {
  console.log('selected>>>', this.selected)
    console.log('data>>>', this.data['status_room'])
    this.firstName = this.data['firstName'];
    this.lastName= this.data['lastName'];        
    this.title = this.data['title']
    this.nbp = this.data['nbp'];
    this.start = this.data['start'],
    this.end = this.data['end']
    this.last = this.data['last']
    this.price = this.data['price']
    this.nb_days = this.data['nb_days']
    this.nb_children = this.data['nb_children']
    this.roomID = this.data['roomID']
    this.status_room = this.data['status_room']
    this.reservation_ID = this.data['reservation_ID']
         if(this.data['status_room'] === "RESERVE"){
           this.selected = 1 ;
         }
        else if(this.data['status_room'] === "OCCUPE"){
            this.selected = 2 ;
        }  
        else {
           this.selected = 3 ;
        }
      
       
   
   
}



  
gotoReservation(){
    this._router.navigate(["reservation/reserver/"+String(`${this.last}`)])
}


selectedValue(event:any){
  this.selected = event.value;
  console.log("selected value>>>",event.value);
  this.data['selected'] = this.selected ;
}
deleteReservation(data:any){
  console.log('reservationid>>>', data.reservation_ID);
  
 this._reservationService.deleteReservation(data.reservation_ID).subscribe((resp:any) => {
  this.showNotification(
    'snackbar-success',
    resp.message,
    'top',
    'end'
  )
 })
}

showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}

}
