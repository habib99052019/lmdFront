import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';

@Component({
  selector: 'app-addchambre-reservation',
  templateUrl: './addchambre-reservation.component.html',
  styleUrls: ['./addchambre-reservation.component.sass']
})
export class AddchambreReservationComponent implements OnInit {


  end = '';
  Chambres = [
    {
        "status": "RESERVE",
        "_id": "6154c96fe2993a55062ca035",
        "name": "Ruppia",
        "number": "99",
        "floor": "3",
        "number_places": "3",
        "created_at": "2021-09-29T20:15:43.485Z",
        "updated_at": "2021-10-07T14:32:42.407Z",
        "__v": 0,
        "price": "245",
        "DOUBLE_BAS_SAISON": 315,
        "DOUBLE_HAUTE_SAISON": 385,
        "SINGLE_BAS_SAISON": 245,
        "SINGLE_HAUTE_SAISON": 315,
        "primary": "43ac6a",
        "secondary": "rgb(227, 37, 0 , 0.15)"
    },
    {
        "status": "LIBRE",
        "_id": "6154ccbf6cf1ad59a1e77ce0",
        "name": "Ciconia",
        "number": "99",
        "floor": "3",
        "price": "210",
        "tarif": "summer",
        "number_places": "3",
        "created_at": "2021-09-29T20:29:51.867Z",
        "updated_at": "2021-10-06T22:07:24.914Z",
        "__v": 0,
        "DOUBLE_BAS_SAISON": 300,
        "DOUBLE_HAUTE_SAISON": 370,
        "SINGLE_BAS_SAISON": 230,
        "SINGLE_HAUTE_SAISON": 300,
        "primary": "43ac6a",
        "secondary": "rgb(130, 175, 167 , 0.29)"
    },
    {
        "status": "LIBRE",
        "_id": "615b15ce5706e518be09c3ad",
        "name": "Amorpha",
        "number": "99",
        "floor": "3",
        "number_places": "3",
        "created_at": "2021-09-29T20:15:43.485Z",
        "updated_at": "2021-09-29T20:15:43.485Z",
        "__v": 0,
        "price": "240",
        "DOUBLE_BAS_SAISON": 315,
        "DOUBLE_HAUTE_SAISON": 385,
        "SINGLE_BAS_SAISON": 245,
        "SINGLE_HAUTE_SAISON": 315,
        "primary": "43ac6a",
        "secondary": "rgb(255, 226, 217)"
    },
    {
        "status": "LIBRE",
        "_id": "615b16755706e518be09c3ae",
        "name": "Marabou",
        "number": "99",
        "floor": "3",
        "number_places": "3",
        "created_at": "2021-09-29T20:15:43.485Z",
        "updated_at": "2021-09-29T20:15:43.485Z",
        "__v": 0,
        "price": "300",
        "DOUBLE_BAS_SAISON": 370,
        "DOUBLE_HAUTE_SAISON": 440,
        "SINGLE_BAS_SAISON": 300,
        "SINGLE_HAUTE_SAISON": 370,
        "primary": "43ac6a",
        "secondary": "rgb(170, 93, 93 , 0.31)"
    },
    {
        "status": "LIBRE",
        "_id": "615b1ba75706e518be09c3af",
        "name": "Brecon",
        "number": "99",
        "floor": "3",
        "number_places": "3",
        "created_at": "2021-09-29T20:15:43.485Z",
        "updated_at": "2021-09-29T20:15:43.485Z",
        "__v": 0,
        "price": "335",
        "DOUBLE_BAS_SAISON": 405,
        "DOUBLE_HAUTE_SAISON": 475,
        "SINGLE_BAS_SAISON": 335,
        "SINGLE_HAUTE_SAISON": 405,
        "primary": "43ac6a",
        "secondary": "rgb(246, 230, 195)"
    },
    {
        "status": "LIBRE",
        "_id": "615b1c395706e518be09c3b0",
        "name": "Colony",
        "number": "99",
        "floor": "3",
        "number_places": "3",
        "created_at": "2021-09-29T20:15:43.485Z",
        "updated_at": "2021-09-29T20:15:43.485Z",
        "__v": 0,
        "price": "385",
        "DOUBLE_BAS_SAISON": 455,
        "DOUBLE_HAUTE_SAISON": 525,
        "SINGLE_BAS_SAISON": 385,
        "SINGLE_HAUTE_SAISON": 455,
        "primary": "43ac6a",
        "secondary": "rgb(249, 75, 75 , 0.31)"
    },
    {
        "status": "LIBRE",
        "_id": "615b1c945706e518be09c3b2",
        "name": "Cicogne",
        "number": "99",
        "floor": "3",
        "price": "265",
        "tarif": "summer",
        "number_places": "1",
        "created_at": "2021-09-29T20:29:51.867Z",
        "updated_at": "2021-10-04T15:16:16.369Z",
        "__v": 0,
        "DOUBLE_BAS_SAISON": 335,
        "DOUBLE_HAUTE_SAISON": 405,
        "SINGLE_BAS_SAISON": 265,
        "SINGLE_HAUTE_SAISON": 335,
        "primary": "43ac6a",
        "secondary": "rgb(196, 214, 240)"
    },
    {
        "status": "RESERVE",
        "_id": "615f05b49fe274596998ffec",
        "name": "Bonnelli",
        "number": "99",
        "floor": "3",
        "price": "640",
        "number_places": "3",
        "created_at": "2021-10-07T14:35:32.892Z",
        "updated_at": "2021-10-07T14:36:26.074Z",
        "__v": 0,
        "primary": "43ac6a",
        "secondary": "rgb(210, 246, 213)",
        "DOUBLE_BAS_SAISON": 280,
        "DOUBLE_HAUTE_SAISON": 350,
        "SINGLE_BAS_SAISON": 210,
        "SINGLE_HAUTE_SAISON": 280
    }
]
roomType = '';
taarifType = '';
extra = '';
RoomPrice = 0;
Days = 0 ;
minDate : any ;
maxDate : any ;
reservationChambreForm: FormGroup;
priceTotal = 0;
todayDate = new Date() ;
room : any
SINGLE_BAS_SAISON : any;
SINGLE_HAUTE_SAISON : any;
DOUBLE_BAS_SAISON:any;
DOUBLE_HAUTE_SAISON:any;
roomName: any;

  constructor(
    public routerActivated: ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    private _reservationService: ReservationServiceService,
    private snackBar: MatSnackBar,
  ) {

    this.routerActivated.params.subscribe(params => {
      console.log("start>>>", params.object)
        this.end = params.object
     })
    
     this.reservationChambreForm = this.createContactForm();
     console.log('reservationChambreForm>>>', this.reservationChambreForm);
     
   }



  ngOnInit(): void {

  }


createContactForm(): FormGroup {
    return this.fb.group({
      type : [ 'room' ],
      first_name : [ '' , Validators.required],
      last_name : ['' , Validators.required],
      taarifType:['' , Validators.required],
      roomType:['' , Validators.required],
      roomID : ['' ],
      size : ['' , Validators.required],
      startDate : ['' , Validators.required],
      endDate : ['' , Validators.required],
      number_guests : [2 ],
      comment : [''],
      remarque : [''],
      taarif : [''],
      extra : [''],
      price : [''],
    });
  }




checkDates(event : any ){
  //  console.log('checkDates>>>', event)
    const temporryDate = this.reservationChambreForm.get('startDate').value.getTime() + (1000 * 60 * 60 * 24)
    this.minDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
    if (this.reservationChambreForm.get('endDate').value){
      var Time = this.reservationChambreForm.get('endDate').value.getTime() - event.value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
    }
    return
}

 calculDateDays(event : any ){
  const temporryDate = this.reservationChambreForm.get('endDate').value.getTime() - (1000 * 60 * 60 * 24)
  this.maxDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
  if (this.reservationChambreForm.get('startDate').value){
    var Time = event.value.getTime() - this.reservationChambreForm.get('startDate').value.getTime() ; 
    var Days = Time / (1000 * 3600 * 24);
    this.Days = Days
    this.calculTotal(this.Days , this.RoomPrice);
  }
  return 
}

selectTaarifType(event: any){
  this.taarifType = event.value;
  if (this.room){
    if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
      this.RoomPrice = this.room?.SINGLE_BAS_SAISON  
    } 
    else if (this.roomType === 'single' && this.taarifType === 'haut de saison'){
      this.RoomPrice = this.room?.SINGLE_HAUTE_SAISON        
    }
    else if (this.roomType === 'double' && this.taarifType === 'bas de saison'){
      this.RoomPrice = this.room?.SINGLE_BAS_SAISON
    }
    else if (this.roomType === 'double' && this.taarifType === 'haut de saison'){
      this.RoomPrice = this.room?.DOUBLE_HAUTE_SAISON
    }
    this.calculTotal(this.Days , this.RoomPrice);
  }
}


selectRoomType(event: any){
  this.roomType = event.value;    
  console.log('roomName>>>', this.reservationChambreForm.value.roomID);

  if (this.reservationChambreForm.value.roomID){
    if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
      this.RoomPrice = 300
      this.SINGLE_BAS_SAISON = true
    } 
    else if (this.roomType === 'single' && this.taarifType === 'haut de saison'){
      this.RoomPrice = 500
      this.SINGLE_HAUTE_SAISON = true;
    }
    else if (this.roomType === 'double' && this.taarifType === 'bas de saison'){
      this.RoomPrice = 450
      this.DOUBLE_BAS_SAISON = true;
    }
    else if (this.roomType === 'double' && this.taarifType === 'haut de saison'){
      this.RoomPrice = 800
      this.DOUBLE_HAUTE_SAISON = true;
    }
    
    this.calculTotal(this.Days , this.RoomPrice);
  }
}


calculTotal(days : any , roomPrice : any ){
  //console.log('room price>>>',roomPrice);
  //console.log('days>>>',days);
  this.priceTotal = roomPrice * days
  console.log("price", this.priceTotal)
  this.reservationChambreForm.get('price').setValue(this.priceTotal);
}



addNewReservation(){

  //console.log('addReservation>>>', this.reservationChambreForm)
 
  const realStart = formatDate(this.reservationChambreForm.get('startDate').value, 'yyyy-MM-dd', 'en')+'T13:00:00';
 
  const realEnd = formatDate(this.reservationChambreForm.get('endDate').value, 'yyyy-MM-dd', 'en')+'T11:00:00';
 
  const reservation = {
    type : 'room' ,
    first_name : this.reservationChambreForm.get('first_name').value,
    last_name : this.reservationChambreForm.get('last_name').value,
    name : this.reservationChambreForm.get('roomID').value,
    backgroundColor:"yellow",
    other:"rgb(157, 203, 255)",
    last:realEnd,
    SINGLE_BAS_SAISON: this.SINGLE_BAS_SAISON,
    status:"RESERVE",
    status_reservation: "INITIALISER",    
    startDate : realStart,
    endDate : realEnd,
    number_guests : 0,
    number_children : 0,
    comment : this.reservationChambreForm.get('comment').value,
    extra : this.reservationChambreForm.get('extra').value,
    price : this.priceTotal
  }

  
  this._reservationService.addReservation(reservation).subscribe((data : any) => {
  // console.log('data from server >>>',data);
    
    this.showNotification(
      'snackbar-success',
       data.message,
      'top',
      'end'
    );
    this.router.navigate(['/reservation/calendrier'])
    
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
