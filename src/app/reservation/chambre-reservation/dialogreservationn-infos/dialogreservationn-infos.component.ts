import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import * as moment from 'moment';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import Swal from 'sweetalert2';
import { take } from "rxjs/operators";
@Component({
  selector: 'app-dialogreservationn-infos',
  templateUrl: './dialogreservationn-infos.component.html',
  styleUrls: ['./dialogreservationn-infos.component.scss']
})
export class DialogreservationnInfosComponent implements OnInit {

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
    },
    {
      
      "name": "Toute la villa",
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
  number_phone='';
  showMenuDetails = true;
  minDate : any ;
  maxDate : any ;
  todayDate = new Date() ;
  date:any;
  reservationChambreForm: FormGroup;
  comment:any;
  startFiltre:any;
  endFiltre:any;
  number_adulte:any;
  extra:any;
  tarifType:any;
  roomTypeSelected:any;
  remark:any;
  SINGLE_BAS_SAISON : any;
  SINGLE_HAUTE_SAISON : any;
  DOUBLE_BAS_SAISON:any;
  DOUBLE_HAUTE_SAISON:any;
  roomType = '';
  taarifType = '';
  RoomPrice = 0;
  startDate:any;
  Days = 0 ;
  extraPrice:any;
  priceTotal = 0;
  roomName:any;
  auxTarifType:any;
  gstartfiltre:any;
  gendfiltre:any;
  startchekdate:any;
  endchekdate:any;
  panelOpenState = false;

  menu1:any;
  menu2:any;
  priceWithRemise = 0;
  listOfTarifNames:any;
  listOfTarifNames2:any;
  roomPriceTotal:any;
  roomRemiseTotal:any;
constructor(
    public dialogRef: MatDialogRef<DialogreservationnInfosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
     public _router:Router,
     public _reservationService:ReservationServiceService,
     private snackBar: MatSnackBar
     ) {
          if(this.data['roomType'] === "single"){
            this.roomTypeSelected = 1;
            this.roomName = 'single'
          }else if(this.data['roomType'] === "double") {
          this.roomTypeSelected = 2;
          this.roomName = 'double'
          }
          
          console.log('room type constracture>>>', this.roomTypeSelected);
          this.roomType = this.roomTypeSelected;
      }

ngOnInit(): void {
 
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
    this.comment = this.data['comment'],
    this.startFiltre = this.data['startFiltre'],
    this.endFiltre =  this.data['endFiltre'],
    this.number_adulte = this.data['number_adulte'],
    this.extra = this.data['extra']
    this.tarifType = this.data['tarifType']
    this.remark = this.data['remark']
    this.number_phone = this.data['number_phone']
    this.priceWithRemise =  this.data['price'] ;
    this.roomRemiseTotal = this.data['remiseTotal']

    this.data['SINGLE_BAS_SAISON'] 
    this.data['DOUBLE_BAS_SAISON'] 
    this.data['SINGLE_HAUTE_SAISON'] 
    this.data['DOUBLE_HAUTE_SAISON'] 
   // this.roomPriceTotal = +this.data['priceTotal'] + +this.data['price'] 
    
  // this.roomPriceTotal = 2000
  // this.data['priceTotal'] = this.roomPriceTotal;
 // this.data['priceTotal'] = this.roomPriceTotal;

     if(this.data['status_room'] === "RESERVE"){
           this.selected = 1 ;
       }
      else if(this.data['status_room'] === "OCCUPE"){
            this.selected = 2 ;
      }  
      else if(this.data['status_room'] === "FERMER"){
           this.selected = 3 ;
       }
       

       //////////
      
        this.initTarifType()
        this.initcheckDates()
        this.initcalculTotal(this.Days,this.RoomPrice)
       
        this.data['selected'] = this.selected ;

       /////////
       this.getRoomReservationById()
       this.getRoomTotalPrice()
    
}



getRoomReservationById(){
    this._reservationService.getReservation(this.reservation_ID).pipe(take(1)).subscribe(data => {
     
      if(data[0].listmenuID[0].typeRepas != undefined){
        this.menu1 = data[0].listmenuID[0].typeRepas;
        this.listOfTarifNames = data[0].listmenuID[0].menuList;
      }
      if(data[0].listmenuID[1].typeRepas != undefined){
         this.menu2 = data[0].listmenuID[1].typeRepas;
         this.listOfTarifNames2 = data[0].listmenuID[1].menuList;
      }
       
    
    })
}

getRoomTotalPrice(){

  this._reservationService.getRoomTotalPrice(this.reservation_ID).pipe(take(1)).subscribe(data => {
      console.log('data>>>', data);
      
    this.roomPriceTotal = data
   // this.data['remiseTotal'] = this.roomPriceTotal;
  
  })
}

selectTotalPrice($event:any){
  console.log('select totale price >>>', $event);
  
}


selectRoomNatureType(event:MatSelectChange){
    console.log('event value>>>',event);
    
}


initTarifType(){
 
  
 
  
  if (true){

    if(this.title === 'Ruppia')
        {
         
          if (this.roomTypeSelected == '1' &&  this.tarifType === 'bas de saison'){
              this.RoomPrice = 245;
              this.roomType = '1'


              this.SINGLE_BAS_SAISON = true;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;

          } 
          else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
            
              this.RoomPrice = 315;
              this.roomType = '2'
              this.DOUBLE_BAS_SAISON = true;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;
          }
          //cas single et haute de saison
          else if(this.roomTypeSelected  == '1' && this.tarifType === 'haut de saison'){
              this.RoomPrice = 315;
              this.roomType = '1'
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = true;
              this.DOUBLE_HAUTE_SAISON = false;
            }
          //cas double et haute de saison
            else{
              this.RoomPrice = 385;
              this.roomType = '2'
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = true;
            }
        }
    if(this.title  === 'Bonnelli'){
            if (this.roomTypeSelected  == '1' &&  this.tarifType === 'bas de saison'){
              this.RoomPrice = 210;
              this.roomType = '1'
              this.SINGLE_BAS_SAISON = true;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;

          } 
          else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
              this.RoomPrice = 280;
              this.roomType = '2'
              this.DOUBLE_BAS_SAISON = true;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;
          }
          //cas single et haute de saison
          else if(this.roomTypeSelected == '1' &&  this.tarifType === 'haut de saison'){
            this.RoomPrice = 280;
            this.roomType = '1'
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = true;
            this.DOUBLE_HAUTE_SAISON = false;
          }
        //cas double et haute de saison
          else{
            this.RoomPrice = 350;
            this.roomType = '2'
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = true;
          }
          

    }

    if(this.title  === 'Amorpha'){
          if (this.roomTypeSelected  == '1' &&  this.tarifType === 'bas de saison'){
            this.RoomPrice = 245;
            this.roomType = '1'
            this.SINGLE_BAS_SAISON = true;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;

        } 
        else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
            this.RoomPrice = 315;
            this.roomType = '2'
            this.DOUBLE_BAS_SAISON = true;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;
        }
        //cas single et haute de saison
        else if(this.roomTypeSelected  == '1' &&  this.tarifType === 'haut de saison'){
          this.RoomPrice = 315;
          this.roomType = '1'
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = true;
          this.DOUBLE_HAUTE_SAISON = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 385;
          this.roomType = '2'
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = true;
        }
    }

      if(this.title  === 'Ciconia'){
        if (this.roomTypeSelected  == '1' &&  this.tarifType === 'bas de saison'){
          this.RoomPrice = 230;
          this.roomType = '1'
          this.SINGLE_BAS_SAISON = true;
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = false;

      } 
      else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
          this.RoomPrice = 300;
          this.roomType = '2'
          this.DOUBLE_BAS_SAISON = true;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = false;
      }
        //cas single et haute de saison
        else if(this.roomTypeSelected  == '1' &&  this.tarifType === 'haut de saison'){
          this.RoomPrice = 300;
          this.roomType = '1'
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = true;
          this.DOUBLE_HAUTE_SAISON = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 370;
          this.roomType = '2'
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = true;
        }

    }
      
    if(this.title  === 'Marabou'){
      if (this.roomTypeSelected  == '1' &&  this.tarifType === 'bas de saison'){
          this.RoomPrice = 300;
          this.roomType = '1'
          this.SINGLE_BAS_SAISON = true;
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = false;

    } 
    else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
          this.RoomPrice = 370;
          this.roomType = '2'
          this.DOUBLE_BAS_SAISON = true;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = false;
    }
    //cas single et haute de saison
    else if(this.roomTypeSelected  == '1' &&  this.tarifType === 'haut de saison'){
      this.RoomPrice = 370;
      this.roomType = '1'
      this.DOUBLE_BAS_SAISON = false;
      this.SINGLE_BAS_SAISON = false;
      this.SINGLE_HAUTE_SAISON = true;
      this.DOUBLE_HAUTE_SAISON = false;
    }
  //cas double et haute de saison
    else{
      this.RoomPrice = 440;
      this.roomType = '2'
      this.DOUBLE_BAS_SAISON = false;
      this.SINGLE_BAS_SAISON = false;
      this.SINGLE_HAUTE_SAISON = false;
      this.DOUBLE_HAUTE_SAISON = true;
    }


    }

    if(this.title  === 'Brecon'){
      if (this.roomTypeSelected  == '1' &&  this.tarifType === 'bas de saison'){
        this.RoomPrice = 335;
        this.roomType = '1'
        this.SINGLE_BAS_SAISON = true;
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = false;

    } 
    else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
          this.RoomPrice = 405;
          this.roomType = '2'
          this.DOUBLE_BAS_SAISON = true;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = false;
    }
      //cas single et haute de saison
      else if(this.roomTypeSelected  == '1' &&  this.tarifType=== 'haut de saison'){
        this.RoomPrice = 405;
        this.roomType = '1'
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = true;
        this.DOUBLE_HAUTE_SAISON = false;
      }
    //cas double et haute de saison
      else{
        this.RoomPrice = 475;
        this.roomType = '2'
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = true;
      }

    }

    if(this.title  === 'Colony'){
      if (this.roomTypeSelected  == '1' &&  this.tarifType === 'bas de saison'){
        this.RoomPrice = 385;
        this.roomType = '1'
        this.SINGLE_BAS_SAISON = true;
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = false;

    } 
    else if(this.roomTypeSelected  == '2' &&  this.tarifType === 'bas de saison'){
        this.RoomPrice = 455;
        this.roomType = '2'
        this.DOUBLE_BAS_SAISON = true;
        this.SINGLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = false;
    }
     //cas single et haute de saison
     else if(this.roomTypeSelected  == '1' &&  this.tarifType === 'haut de saison'){
      this.RoomPrice = 455;
      this.roomType = '1'
      this.DOUBLE_BAS_SAISON = false;
      this.SINGLE_BAS_SAISON = false;
      this.SINGLE_HAUTE_SAISON = true;
      this.DOUBLE_HAUTE_SAISON = false;
    }
  //cas double et haute de saison
    else{
      this.RoomPrice = 525;
      this.roomType = '2'
      this.DOUBLE_BAS_SAISON = false;
      this.SINGLE_BAS_SAISON = false;
      this.SINGLE_HAUTE_SAISON = false;
      this.DOUBLE_HAUTE_SAISON = true;
    }

    }

    if(this.title  === 'Cicogne'){
      
      if (this.roomTypeSelected == '1' &&  this.tarifType === 'bas de saison'){
        this.RoomPrice = 265;
        this.roomType = '1'
        this.SINGLE_BAS_SAISON = true;
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = false;

    } 
    else if(this.roomTypeSelected == '2' &&  this.tarifType === 'bas de saison'){
        this.RoomPrice = 335;
        this.roomType = '2'
        this.DOUBLE_BAS_SAISON = true;
        this.SINGLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = false;
    }
      //cas single et haute de saison
      else if(this.roomTypeSelected == '1' &&  this.tarifType === 'haut de saison'){
        this.RoomPrice = 335;
        this.roomType = '1'
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = true;
        this.DOUBLE_HAUTE_SAISON = false;
      }
    //cas double et haute de saison
      else{
        this.RoomPrice = 405;
        this.roomType = '2'
        this.DOUBLE_BAS_SAISON = false;
        this.SINGLE_BAS_SAISON = false;
        this.SINGLE_HAUTE_SAISON = false;
        this.DOUBLE_HAUTE_SAISON = true;
      }

    }
    if(this.title === 'Toute la villa' && this.tarifType === 'bas de saison'){
       this.RoomPrice = 2100;
    }
    if(this.title === 'Toute la villa' && this.tarifType === 'haut de saison'){
       this.RoomPrice = 2600;
    }

this.calculTotal(this.Days , this.RoomPrice);
}

}



initcheckDates(){
  
     const dateStart = new Date(this.startFiltre).toISOString();
     const temporryDate = new Date(dateStart).getTime() + (1000 * 60 * 60 * 24)
    
     this.minDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
     if (this.endFiltre){
      const dateEnd = new Date(this.endFiltre).toISOString();

     var Time = new Date(dateEnd).getTime() - new Date(dateStart).getTime() ; 
     var Days = Time / (1000 * 3600 * 24);
     
     
     this.Days = Days
     this.calculTotal(this.Days , this.RoomPrice);
   }

   
  
   return
}



checkDates(event : any ){
 
  this.startFiltre = event.value;
    this.startchekdate = formatDate(this.startFiltre , 'yyyy-MM-dd' , 'en');
    

   
     this.minDate = this.startchekdate;
     if (this.endFiltre){
    var start = moment(this.startchekdate);
    var end = moment(this.endFiltre);
   
     const Days = end.diff(start, "days")
     
     this.Days =  Days
    
     this.calculTotal(this.Days , this.RoomPrice);
   }
   return
}



initcalculTotal(days : any , roomPrice : any){
 

  if(this.extra === "lit adulte" || this.extra === "lit enfant"){
   
     this.priceTotal = (roomPrice * days) + 90;
  }else if(this.extra === "Deux lit adulte" || this.extra === "Deux lit enfant"){
    this.priceTotal = (roomPrice * days) + 180;
  }
  
  else{
    this.priceTotal = roomPrice * days;
  }
 
 
  this.price = this.priceTotal
}


calculTotal(days : any , roomPrice : any){
 

  if(this.extraPrice && this.extra === "lit adulte" || this.extra === "lit enfant"){
    
     this.priceTotal = (roomPrice * days) + 90;
  }else if(this.extraPrice && this.extra === "Deux lit adulte" || this.extra === "Deux lit enfant"){
    this.priceTotal = (roomPrice * days) + 180;
  }
  
  else{
    this.priceTotal = roomPrice * days;
  }
 
 
  this.price = this.priceTotal


}


calculDateDays(event : any ){

   this.gstartfiltre = formatDate(this.startFiltre , 'yyyy-MM-dd' , 'en');
 
   this.gendfiltre = formatDate(event.value , 'yyyy-MM-dd' , 'en');
  
 
    this.maxDate = this.endFiltre;
    if (this.endFiltre){
   var start = moment(this.gstartfiltre);
   var end = moment(this.gendfiltre);
  
    const Days = end.diff(start, "days")
   
    this.Days =  Days
    this.calculTotal(this.Days , this.RoomPrice);
  }
 return 
}



selectTaarifType(event: any){
  
 this.tarifType = event.value;


 if (true){

  if(this.title === 'Ruppia')
      {
        if (this.roomType == '1' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 245;
            this.data['SINGLE_BAS_SAISON'] = true;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
          

        } 
        else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 315;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = true;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
        //cas single et haute de saison
        else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
            this.RoomPrice = 315;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
          }
        //cas double et haute de saison
          else{
            this.RoomPrice = 385;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = true;
          }
      }
  if(this.title  === 'Bonnelli'){
          if (this.roomType == '1' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 210;
            this.data['SINGLE_BAS_SAISON'] = true;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
          

        } 
        else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 280;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = true;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
        //cas single et haute de saison
        else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
          this.RoomPrice = 280;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 350;
          this.data['SINGLE_BAS_SAISON'] = false;
          this.data['DOUBLE_BAS_SAISON'] = false;
          this.data['SINGLE_HAUTE_SAISON'] = false;
          this.data['DOUBLE_HAUTE_SAISON'] = true;
        }
        

  }

  if(this.title  === 'Amorpha'){
        if (this.roomType == '1' && this.tarifType === 'bas de saison'){
          this.RoomPrice = 245;
          this.data['SINGLE_BAS_SAISON'] = true;
          this.data['DOUBLE_BAS_SAISON'] = false;
          this.data['SINGLE_HAUTE_SAISON'] = false;
          this.data['DOUBLE_HAUTE_SAISON'] = false;

      } 
      else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
          this.RoomPrice = 315;
          this.data['SINGLE_BAS_SAISON'] = false;
          this.data['DOUBLE_BAS_SAISON'] = true;
          this.data['SINGLE_HAUTE_SAISON'] = false;
          this.data['DOUBLE_HAUTE_SAISON'] = false;
      }
      //cas single et haute de saison
      else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
        this.RoomPrice = 315;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
      }
    //cas double et haute de saison
      else{
        this.RoomPrice = 385;
        this.data['SINGLE_BAS_SAISON'] = false;
        this.data['DOUBLE_BAS_SAISON'] = false;
        this.data['SINGLE_HAUTE_SAISON'] = false;
        this.data['DOUBLE_HAUTE_SAISON'] = true;
      }
  }

    if(this.title  === 'Ciconia'){
      if (this.roomType == '1' && this.tarifType === 'bas de saison'){
        this.RoomPrice = 230;
          this.data['SINGLE_BAS_SAISON'] = true;
          this.data['DOUBLE_BAS_SAISON'] = false;
          this.data['SINGLE_HAUTE_SAISON'] = false;
          this.data['DOUBLE_HAUTE_SAISON'] = false;

    } 
    else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
        this.RoomPrice = 300;
        this.data['SINGLE_BAS_SAISON'] = false;
        this.data['DOUBLE_BAS_SAISON'] = true;
        this.data['SINGLE_HAUTE_SAISON'] = false;
        this.data['DOUBLE_HAUTE_SAISON'] = false;
    }
      //cas single et haute de saison
      else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
        this.RoomPrice = 300;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
      }
    //cas double et haute de saison
      else{
        this.RoomPrice = 370;
        this.data['SINGLE_BAS_SAISON'] = false;
        this.data['DOUBLE_BAS_SAISON'] = false;
        this.data['SINGLE_HAUTE_SAISON'] = false;
        this.data['DOUBLE_HAUTE_SAISON'] = true;
      }

  }
    
  if(this.title  === 'Marabou'){
    if (this.roomType == '1' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 300;
      this.data['SINGLE_BAS_SAISON'] = true;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;

  } 
  else if(this.roomType === '2' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 370;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = true;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;
  }
  //cas single et haute de saison
  else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
    this.RoomPrice = 370;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
  }
//cas double et haute de saison
  else{
    this.RoomPrice = 440;
    this.data['SINGLE_BAS_SAISON'] = false;
    this.data['DOUBLE_BAS_SAISON'] = false;
    this.data['SINGLE_HAUTE_SAISON'] = false;
    this.data['DOUBLE_HAUTE_SAISON'] = true;
  }


  }

  if(this.title  === 'Brecon'){
    if (this.roomType == '1' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 335;
      this.data['SINGLE_BAS_SAISON'] = true;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;

  } 
  else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 405;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = true;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;
  }
    //cas single et haute de saison
    else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
      this.RoomPrice = 405;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
    }
  //cas double et haute de saison
    else{
      this.RoomPrice = 475;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = true;
    }

  }

  if(this.title  === 'Colony'){
    if (this.roomType == '1' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 385;
      this.data['SINGLE_BAS_SAISON'] = true;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;
  } 
  else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 455;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = true;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;
  }
   //cas single et haute de saison
   else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
    this.RoomPrice = 455;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
  }
//cas double et haute de saison
  else{
    this.RoomPrice = 525;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = true;
  }

  }

  if(this.title  === 'Cicogne'){
    if (this.roomType == '1' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 265;
      this.data['SINGLE_BAS_SAISON'] = true;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;

  } 
  else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
      this.RoomPrice = 335;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = true;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = false;
  }
    //cas single et haute de saison
    else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
      this.RoomPrice = 335;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = true;
      this.data['DOUBLE_HAUTE_SAISON'] = false;
    }
  //cas double et haute de saison
    else{
      this.RoomPrice = 405;
      this.data['SINGLE_BAS_SAISON'] = false;
      this.data['DOUBLE_BAS_SAISON'] = false;
      this.data['SINGLE_HAUTE_SAISON'] = false;
      this.data['DOUBLE_HAUTE_SAISON'] = true;
    }

  }
  if(this.title === 'Toute la villa' && this.tarifType === 'bas de saison'){
    this.RoomPrice = 2100;
 }
 if(this.title === 'Toute la villa' && this.tarifType === 'haut de saison'){
    this.RoomPrice = 2600;
 }

this.calculTotal(this.Days , this.RoomPrice);
}
 
 }


//probleme de refreche tarif 
selectRoomType(event: any){
  this.roomType = event.value;

  if(event.value == '1'){
     this.roomName = 'single'
  }else{
    this.roomName = 'double'
  }
   

  
  
  if (this.roomType){

        if(this.title === 'Ruppia')
            {
              if (this.roomType == '1' && this.tarifType === 'bas de saison'){
                  this.RoomPrice = 245;
                  this.data['SINGLE_BAS_SAISON'] = true;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = false;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
                

              } 
              else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
                  this.RoomPrice = 315;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = true;
                  this.data['SINGLE_HAUTE_SAISON'] = false;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
              }
              //cas single et haute de saison
              else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
                  this.RoomPrice = 315;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
                }
              //cas double et haute de saison
                else{
                  this.RoomPrice = 385;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = false;
                  this.data['DOUBLE_HAUTE_SAISON'] = true;
                }
            }
        if(this.title  === 'Bonnelli'){
                if (this.roomType == '1' && this.tarifType === 'bas de saison'){
                  this.RoomPrice = 210;
                  this.data['SINGLE_BAS_SAISON'] = true;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = false;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
                

              } 
              else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
                  this.RoomPrice = 280;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = true;
                  this.data['SINGLE_HAUTE_SAISON'] = false;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
              }
              //cas single et haute de saison
              else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
                this.RoomPrice = 280;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
              }
            //cas double et haute de saison
              else{
                this.RoomPrice = 350;
                this.data['SINGLE_BAS_SAISON'] = false;
                this.data['DOUBLE_BAS_SAISON'] = false;
                this.data['SINGLE_HAUTE_SAISON'] = false;
                this.data['DOUBLE_HAUTE_SAISON'] = true;
              }
              

        }

        if(this.title  === 'Amorpha'){
              if (this.roomType == '1' && this.tarifType === 'bas de saison'){
                this.RoomPrice = 245;
                this.data['SINGLE_BAS_SAISON'] = true;
                this.data['DOUBLE_BAS_SAISON'] = false;
                this.data['SINGLE_HAUTE_SAISON'] = false;
                this.data['DOUBLE_HAUTE_SAISON'] = false;

            } 
            else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
                this.RoomPrice = 315;
                this.data['SINGLE_BAS_SAISON'] = false;
                this.data['DOUBLE_BAS_SAISON'] = true;
                this.data['SINGLE_HAUTE_SAISON'] = false;
                this.data['DOUBLE_HAUTE_SAISON'] = false;
            }
            //cas single et haute de saison
            else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
              this.RoomPrice = 315;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
            }
          //cas double et haute de saison
            else{
              this.RoomPrice = 385;
              this.data['SINGLE_BAS_SAISON'] = false;
              this.data['DOUBLE_BAS_SAISON'] = false;
              this.data['SINGLE_HAUTE_SAISON'] = false;
              this.data['DOUBLE_HAUTE_SAISON'] = true;
            }
        }

          if(this.title  === 'Ciconia'){
            if (this.roomType == '1' && this.tarifType === 'bas de saison'){
              this.RoomPrice = 230;
                this.data['SINGLE_BAS_SAISON'] = true;
                this.data['DOUBLE_BAS_SAISON'] = false;
                this.data['SINGLE_HAUTE_SAISON'] = false;
                this.data['DOUBLE_HAUTE_SAISON'] = false;

          } 
          else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
              this.RoomPrice = 300;
              this.data['SINGLE_BAS_SAISON'] = false;
              this.data['DOUBLE_BAS_SAISON'] = true;
              this.data['SINGLE_HAUTE_SAISON'] = false;
              this.data['DOUBLE_HAUTE_SAISON'] = false;
          }
            //cas single et haute de saison
            else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
              this.RoomPrice = 300;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
            }
          //cas double et haute de saison
            else{
              this.RoomPrice = 370;
              this.data['SINGLE_BAS_SAISON'] = false;
              this.data['DOUBLE_BAS_SAISON'] = false;
              this.data['SINGLE_HAUTE_SAISON'] = false;
              this.data['DOUBLE_HAUTE_SAISON'] = true;
            }

        }
          
        if(this.title  === 'Marabou'){
          if (this.roomType == '1' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 300;
            this.data['SINGLE_BAS_SAISON'] = true;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;

        } 
        else if(this.roomType === '2' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 370;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = true;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
        //cas single et haute de saison
        else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
          this.RoomPrice = 370;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 440;
          this.data['SINGLE_BAS_SAISON'] = false;
          this.data['DOUBLE_BAS_SAISON'] = false;
          this.data['SINGLE_HAUTE_SAISON'] = false;
          this.data['DOUBLE_HAUTE_SAISON'] = true;
        }


        }

        if(this.title  === 'Brecon'){
          if (this.roomType == '1' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 335;
            this.data['SINGLE_BAS_SAISON'] = true;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;

        } 
        else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 405;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = true;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
          //cas single et haute de saison
          else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
            this.RoomPrice = 405;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
          }
        //cas double et haute de saison
          else{
            this.RoomPrice = 475;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = true;
          }

        }

        if(this.title  === 'Colony'){
          if (this.roomType == '1' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 385;
            this.data['SINGLE_BAS_SAISON'] = true;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        } 
        else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 455;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = true;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
         //cas single et haute de saison
         else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
          this.RoomPrice = 455;
                  this.data['SINGLE_BAS_SAISON'] = false;
                  this.data['DOUBLE_BAS_SAISON'] = false;
                  this.data['SINGLE_HAUTE_SAISON'] = true;
                  this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 525;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = true;
        }

        }

        if(this.title  === 'Cicogne'){
          if (this.roomType == '1' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 265;
            this.data['SINGLE_BAS_SAISON'] = true;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;

        } 
        else if(this.roomType == '2' && this.tarifType === 'bas de saison'){
            this.RoomPrice = 335;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = true;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
        }
          //cas single et haute de saison
          else if(this.roomType == '1' && this.tarifType === 'haut de saison'){
            this.RoomPrice = 335;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = true;
            this.data['DOUBLE_HAUTE_SAISON'] = false;
          }
        //cas double et haute de saison
          else{
            this.RoomPrice = 405;
            this.data['SINGLE_BAS_SAISON'] = false;
            this.data['DOUBLE_BAS_SAISON'] = false;
            this.data['SINGLE_HAUTE_SAISON'] = false;
            this.data['DOUBLE_HAUTE_SAISON'] = true;
          }

        }
    
    this.calculTotal(this.Days , this.RoomPrice);
  }
}


  
gotoReservation(){
    this._router.navigate(["reservation/reserver/"+String(`${this.last}`)])
}


selectedValue(event:any){
  this.selected = event.value;
 
  this.data['selected'] = this.selected ;
}


/* close the dialog after confirmation */
onCancelClick(){
  this.dialogRef.close();
}



deleteReservation(data:any){
  
/////////////
//delete with confirmation

Swal.fire({
  title: "êtes vous sure?",
  showCancelButton: true,
  cancelButtonText: "Annuler",
  confirmButtonColor: "#f44336",
  cancelButtonColor: "#96a2b4",
  confirmButtonText: "Oui",
}).then((result) => {
 
  if (result.value) {
    this._reservationService.deleteReservation(data.reservation_ID).subscribe((resp:any) => {
      this.showNotification(
        'snackbar-danger',
        "la réservation a été supprimée avec succès",
        'top',
        'end'
      )
     })
  }
});

 



}


showNotification(colorName, text, placementFrom, placementAlign) {
  this.snackBar.open(text, '', {
    duration: 3000,
    verticalPosition: placementFrom,
    horizontalPosition: placementAlign,
    panelClass: colorName,
  });
}


re_calculTotal(event:any){

}


showMenu(event : MatSelectChange){
  // this.extraType = event.value;
   
   
  // this.showMenuDetails = true ; 
   
 }
 

selectExtraType(event:any){
  if(event.value != undefined){
    this.extraPrice = true
    this.extra = event.value;
    this.calculTotal(this.Days,this.RoomPrice)
 }else{
     this.extraPrice = false
     this.extra = event.value;
     this.calculTotal(this.Days,this.RoomPrice)
 }
}



addToTotal(type :any){
  
  this.priceTotal = this.priceTotal + 10;
  this.data['price'] = this.priceTotal;
}


removeFromTotal(type :any){

 this.priceTotal = this.priceTotal - 10
 this.data['price'] = this.priceTotal;
}


}
