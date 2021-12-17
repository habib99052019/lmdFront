import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import * as _moment from 'moment';
import { Moment } from 'moment';
const moment = _moment;

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
showMenuDetails = false;
extraType:any;
roombackgroundColor = ''
extraPrice:any;
endfiltreSearsh:any;
nbp=0;
datetosent : any
realStartTosent: any;
startFiltre:any;
//used for multiple select date
dates: moment.Moment[] = []
date:any;
startDate:any;


  constructor(
    public routerActivated: ActivatedRoute,
    public router:Router,
    private fb: FormBuilder,
    private _reservationService: ReservationServiceService,
    private snackBar: MatSnackBar,
  ) {

    this.routerActivated.params.subscribe(params => {
      console.log("date >>>>",params.object)
       if(params.object === "#"){
         this.end = "";
         console.log("date >>>>",this.end)
       }else{
        const date =  params.object.slice(0, 11);
        this.datetosent = params.object.slice(0, 10)
        this.endfiltreSearsh = params.object.slice(0, 10);
        this.end = date +'13:00:00'
        console.log("date >>>>",this.end)
       }
        
     })
    
     this.reservationChambreForm = this.createContactForm();
     //console.log('reservationChambreForm>>>', this.reservationChambreForm);
    // console.log('startdate >>>', this.date.value);
     
   }



ngOnInit(): void {
    console.log('this.datetosent>>>', this.datetosent);
    
    if(this.datetosent != undefined){
      this.date = new FormControl(new Date(String(this.datetosent)))
    }else{
       this.date = ''
    }
    
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
      number_children: [0, Validators.required],
      number_adulte:[0, Validators.required],
      comment : [''],
      remarque : [''],
      taarif : [''],
      extra : [''],
      price : [''],
    });
  }

checkDates(event : any ){
   console.log('checkDates>>>', event.value)
   this.startDate = event.value;
   console.log('end gate time>>>',this.reservationChambreForm.get('startDate').value.getTime() - this.date.value.getTime());
   /*
    const temporryDate = this.reservationChambreForm.get('startDate').value.getTime() + (1000 * 60 * 60 * 24)
    this.minDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
    if (this.reservationChambreForm.get('endDate').value){
      var Time = this.reservationChambreForm.get('endDate').value.getTime() - event.value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
    }*/
    if(this.datetosent != undefined){
      const temporryDate = this.date.value.getTime() + (1000 * 60 * 60 * 24)
      this.minDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
      
      
      if (this.reservationChambreForm.get('endDate').value){
      var Time = this.reservationChambreForm.get('endDate').value.getTime() - this.date.value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
     }
    }
    else{ 
      
      const temporryDate = event.value.getTime() + (1000 * 60 * 60 * 24)
      console.log('temporryDate>>>',event.value);
      
      this.minDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
     
      if (this.reservationChambreForm.get('endDate').value){
        
        
      var Time = this.reservationChambreForm.get('endDate').value.getTime() - event.value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
    }

    }
   
    return
}

 calculDateDays(event : any ){
  /*
  const temporryDate = this.reservationChambreForm.get('endDate').value.getTime() - (1000 * 60 * 60 * 24)
  this.maxDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
  if (this.reservationChambreForm.get('startDate').value){
    var Time = event.value.getTime() - this.reservationChambreForm.get('startDate').value.getTime() ; 
    var Days = Time / (1000 * 3600 * 24);
    this.Days = Days
    this.calculTotal(this.Days , this.RoomPrice);
  }*/

  if(this.datetosent != undefined){
    console.log('this.date>>>>', this.date.value);
    console.log('end date reservatonform>>>',this.reservationChambreForm.get('endDate').value);
    
    
    const temporryDate = this.reservationChambreForm.get('endDate').value.getTime() - (1000 * 60 * 60 * 24)
    this.maxDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
    if (this.date.value){
      var Time = event.value.getTime() - this.date.value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      console.log('days>>>',Math.ceil(Days));
      
      this.Days = Math.ceil(Days)
      this.calculTotal(this.Days , this.RoomPrice);
    }
  }else{
    console.log('teeeeeeeeee');
    
    const temporryDate = this.reservationChambreForm.get('endDate').value.getTime() - (1000 * 60 * 60 * 24)
    this.maxDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
    if (this.startDate){
      var Time = event.value.getTime() - this.startDate.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      console.log('days>>>',Days);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
    }
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

        if(this.reservationChambreForm.value.roomID === 'Ruppia')
            {
              if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
                  this.RoomPrice = 245;
                  this.SINGLE_BAS_SAISON = true;
                  this.DOUBLE_BAS_SAISON = false;
                  this.SINGLE_HAUTE_SAISON = false;
                  this.DOUBLE_HAUTE_SAISON = false;

              } 
              else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
                  this.RoomPrice = 315;
                  this.DOUBLE_BAS_SAISON = true;
                  this.SINGLE_BAS_SAISON = false;
                  this.SINGLE_HAUTE_SAISON = false;
                  this.DOUBLE_HAUTE_SAISON = false;
              }
              //cas single et haute de saison
              else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
                  this.RoomPrice = 315;
                  this.DOUBLE_BAS_SAISON = false;
                  this.SINGLE_BAS_SAISON = false;
                  this.SINGLE_HAUTE_SAISON = true;
                  this.DOUBLE_HAUTE_SAISON = false;
                }
              //cas double et haute de saison
                else{
                  this.RoomPrice = 385;
                  this.DOUBLE_BAS_SAISON = false;
                  this.SINGLE_BAS_SAISON = false;
                  this.SINGLE_HAUTE_SAISON = false;
                  this.DOUBLE_HAUTE_SAISON = true;
                }
            }
        if(this.reservationChambreForm.value.roomID === 'Bonnelli'){
                if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
                  this.RoomPrice = 210;
                  this.SINGLE_BAS_SAISON = true;
                  this.DOUBLE_BAS_SAISON = false;
                  this.SINGLE_HAUTE_SAISON = false;
                  this.DOUBLE_HAUTE_SAISON = false;

              } 
              else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
                  this.RoomPrice = 280;
                  this.DOUBLE_BAS_SAISON = true;
                  this.SINGLE_BAS_SAISON = false;
                  this.SINGLE_HAUTE_SAISON = false;
                  this.DOUBLE_HAUTE_SAISON = false;
              }
              //cas single et haute de saison
              else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
                this.RoomPrice = 280;
                this.DOUBLE_BAS_SAISON = false;
                this.SINGLE_BAS_SAISON = false;
                this.SINGLE_HAUTE_SAISON = true;
                this.DOUBLE_HAUTE_SAISON = false;
              }
            //cas double et haute de saison
              else{
                this.RoomPrice = 350;
                this.DOUBLE_BAS_SAISON = false;
                this.SINGLE_BAS_SAISON = false;
                this.SINGLE_HAUTE_SAISON = false;
                this.DOUBLE_HAUTE_SAISON = true;
              }
              

        }

        if(this.reservationChambreForm.value.roomID === 'Amorpha'){
              if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
                this.RoomPrice = 245;
                this.SINGLE_BAS_SAISON = true;
                this.DOUBLE_BAS_SAISON = false;
                this.SINGLE_HAUTE_SAISON = false;
                this.DOUBLE_HAUTE_SAISON = false;

            } 
            else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
                this.RoomPrice = 315;
                this.DOUBLE_BAS_SAISON = true;
                this.SINGLE_BAS_SAISON = false;
                this.SINGLE_HAUTE_SAISON = false;
                this.DOUBLE_HAUTE_SAISON = false;
            }
            //cas single et haute de saison
            else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
              this.RoomPrice = 315;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = true;
              this.DOUBLE_HAUTE_SAISON = false;
            }
          //cas double et haute de saison
            else{
              this.RoomPrice = 385;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = true;
            }
        }

          if(this.reservationChambreForm.value.roomID === 'Ciconia'){
            if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
              this.RoomPrice = 230;
              this.SINGLE_BAS_SAISON = true;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;

          } 
          else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
              this.RoomPrice = 300;
              this.DOUBLE_BAS_SAISON = true;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;
          }
            //cas single et haute de saison
            else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
              this.RoomPrice = 300;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = true;
              this.DOUBLE_HAUTE_SAISON = false;
            }
          //cas double et haute de saison
            else{
              this.RoomPrice = 370;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = true;
            }

        }
          
        if(this.reservationChambreForm.value.roomID === 'Marabou'){
          if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 300;
              this.SINGLE_BAS_SAISON = true;
              this.DOUBLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;

        } 
        else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 370;
              this.DOUBLE_BAS_SAISON = true;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;
        }
        //cas single et haute de saison
        else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
          this.RoomPrice = 370;
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = true;
          this.DOUBLE_HAUTE_SAISON = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 440;
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = true;
        }


        }

        if(this.reservationChambreForm.value.roomID === 'Brecon'){
          if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 335;
            this.SINGLE_BAS_SAISON = true;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;

        } 
        else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 405;
              this.DOUBLE_BAS_SAISON = true;
              this.SINGLE_BAS_SAISON = false;
              this.SINGLE_HAUTE_SAISON = false;
              this.DOUBLE_HAUTE_SAISON = false;
        }
          //cas single et haute de saison
          else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
            this.RoomPrice = 405;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = true;
            this.DOUBLE_HAUTE_SAISON = false;
          }
        //cas double et haute de saison
          else{
            this.RoomPrice = 475;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = true;
          }

        }

        if(this.reservationChambreForm.value.roomID === 'Colony'){
          if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 385;
            this.SINGLE_BAS_SAISON = true;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;

        } 
        else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 455;
            this.DOUBLE_BAS_SAISON = true;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;
        }
         //cas single et haute de saison
         else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
          this.RoomPrice = 455;
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = true;
          this.DOUBLE_HAUTE_SAISON = false;
        }
      //cas double et haute de saison
        else{
          this.RoomPrice = 525;
          this.DOUBLE_BAS_SAISON = false;
          this.SINGLE_BAS_SAISON = false;
          this.SINGLE_HAUTE_SAISON = false;
          this.DOUBLE_HAUTE_SAISON = true;
        }

        }

        if(this.reservationChambreForm.value.roomID === 'Cicogne'){
          if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 265;
            this.SINGLE_BAS_SAISON = true;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;

        } 
        else if(this.roomType === 'double' && this.taarifType === 'bas de saison'){
            this.RoomPrice = 335;
            this.DOUBLE_BAS_SAISON = true;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = false;
        }
          //cas single et haute de saison
          else if(this.roomType === 'single' && this.taarifType === 'haut de saison'){
            this.RoomPrice = 335;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = true;
            this.DOUBLE_HAUTE_SAISON = false;
          }
        //cas double et haute de saison
          else{
            this.RoomPrice = 405;
            this.DOUBLE_BAS_SAISON = false;
            this.SINGLE_BAS_SAISON = false;
            this.SINGLE_HAUTE_SAISON = false;
            this.DOUBLE_HAUTE_SAISON = true;
          }

        }
    
    this.calculTotal(this.Days , this.RoomPrice);
  }
}

selectExtraType(event:any){
    
  if(event.value != undefined){
     this.extraPrice = true
     this.extraType = event.value;
     this.calculTotal(this.Days,this.RoomPrice)
  }else{
      this.extraPrice = false
      this.extraType = event.value;
      this.calculTotal(this.Days,this.RoomPrice)
  }
 
}


calculTotal(days : any , roomPrice : any){
  console.log('room price>>>',roomPrice);
  console.log('extraprice>>>',this.extraPrice);
  if(this.extraPrice){
    console.log('days>>>',days);
     this.priceTotal = (roomPrice * days) + 90;
  }else{
    this.priceTotal = roomPrice * days;
  }
 
 // this.priceTotal += this.extraPrice;
  console.log("price", this.priceTotal)
  this.reservationChambreForm.get('price').setValue(this.priceTotal);
}


showMenu(event : MatSelectChange){
 // this.extraType = event.value;
  console.log('event extra type>>>', event.value);
  
  this.showMenuDetails = true ; 
  
}


verifyRoomColor(roomName:any){
    if (roomName === 'Ruppia'){
        this.roombackgroundColor = '#E32500';
    }
    else if(roomName === 'Marabou'){
        this.roombackgroundColor = '#AA5D5D';
    }
    else if(roomName === 'Colony'){
         this.roombackgroundColor = '#F94B4B';
    }
    else if (roomName === 'Ciconia'){
         this.roombackgroundColor = '#82AFA7';
    }
    else if (roomName === 'Cicogne'){
      this.roombackgroundColor = '#C4D6F0';
    }
    else if (roomName === 'Brécon'){
      this.roombackgroundColor = '#F6E6C3';
    }
    else if (roomName === 'Bonnelli'){
      this.roombackgroundColor = '#D2F6D5';
    }
    else{
      this.roombackgroundColor = '#FFE2D9';
    }


}

re_calculTotal(event: any){
  console.log('event nombre enfant>>>', event.target.value);
  
  //this.calculTotal(event.target.value  , this.MenuPrice );
}


numberPersons(nba: number, nbc:number){
    this.nbp = nba + nbc
}


addNewReservation(){

  //console.log('new date start >>>', formatDate(this.startDate, 'yyyy-MM-dd', 'en')+'T13:00:00' )
  
  console.log('single bas de saison>>>', this.SINGLE_BAS_SAISON);
  console.log('double bas de saison>>>', this.DOUBLE_BAS_SAISON);
  console.log('single bas de saison>>>', this.SINGLE_HAUTE_SAISON);
  console.log('double bas de saison>>>', this.DOUBLE_HAUTE_SAISON);
  console.log('numbre adulte>>>',this.reservationChambreForm.get('number_children').value);
  console.log('number children>>>',this.reservationChambreForm.get('number_adulte').value);
  
  
 // const realStart = formatDate(this.reservationChambreForm.get('startDate').value, 'yyyy-MM-dd', 'en')+'T13:00:00';
 if(this.datetosent != undefined){
  this.realStartTosent = formatDate(this.date.value, 'yyyy-MM-dd', 'en')+'T13:00:00';
  this.startFiltre = formatDate(this.date.value, 'yyyy-MM-dd', 'en');
 }else{
  this.realStartTosent = formatDate(this.startDate, 'yyyy-MM-dd', 'en')+'T13:00:00';
  this.startFiltre = formatDate(this.startDate, 'yyyy-MM-dd', 'en');
 }
 

 const realEnd = formatDate(this.reservationChambreForm.get('endDate').value, 'yyyy-MM-dd', 'en')+'T11:00:00';
  //console.log('realstart>>>', realStart);
 //console.log('realend>>>', realEnd);
  
  
  if (this.end == ''){
    this.numberPersons(this.reservationChambreForm.get('number_adulte').value,this.reservationChambreForm.get('number_children').value)
    this.verifyRoomColor(this.reservationChambreForm.get('roomID').value)
    console.log('this.end egal vide >>>', this.end);
    console.log('this.npb >>>', this.nbp);
    const reservation = {
    roomType: 'room' ,
    first_name : this.reservationChambreForm.get('first_name').value,
    last_name : this.reservationChambreForm.get('last_name').value,
    name : this.reservationChambreForm.get('roomID').value,
    backgroundColor:"yellow",
    other:this.roombackgroundColor,
    last:realEnd,
    SINGLE_BAS_SAISON: this.SINGLE_BAS_SAISON,
    DOUBLE_BAS_SAISON:this.DOUBLE_BAS_SAISON,
    SINGLE_HAUTE_SAISON:this.SINGLE_HAUTE_SAISON,
    DOUBLE_HAUTE_SAISON:this.DOUBLE_HAUTE_SAISON,
    status_room:"RESERVE",
    status_reservation: "INITIALISER",    
    startDate : this.realStartTosent,
    endDate : realEnd,
    startFiltre:this.startFiltre,
    endFiltre: formatDate(this.reservationChambreForm.get('endDate').value, 'yyyy-MM-dd', 'en'),
    number_guests : 0,
    number_children :this.reservationChambreForm.get('number_children').value,
    number_adulte:this.reservationChambreForm.get('number_adulte').value,
    number_persons:this.nbp,
    number_days:this.Days,
    comment : this.reservationChambreForm.get('comment').value,
    extra : this.reservationChambreForm.get('extra').value,
    price : this.priceTotal,
    tarifType:this.taarifType,
    remark:this.reservationChambreForm.get('remarque').value
  }

  this._reservationService.addReservation(reservation).subscribe((data : any) => {
   console.log('data from server >>>',data);
    
    this.showNotification(
      'snackbar-success',
       data.message,
      'top',
      'end'
    );
    this.router.navigate(['/reservation/calendrier'])
  }, err => {
     console.log('err>>>',err);
     this.showNotification(
      'snackbar-danger',
       err,
      'top',
      'end'
    );
  })

  }else {
    this.numberPersons(this.reservationChambreForm.get('number_adulte').value,this.reservationChambreForm.get('number_children').value)
    this.verifyRoomColor(this.reservationChambreForm.get('roomID').value)
    console.log('this.end different vide >>>', this.end);
    const reservation = {
      roomType: 'room' ,
      first_name : this.reservationChambreForm.get('first_name').value,
      last_name : this.reservationChambreForm.get('last_name').value,
      name : this.reservationChambreForm.get('roomID').value,
      backgroundColor:"yellow",
      other:this.roombackgroundColor,
      last:realEnd,
      SINGLE_BAS_SAISON: this.SINGLE_BAS_SAISON,
      DOUBLE_BAS_SAISON:this.DOUBLE_BAS_SAISON,
      SINGLE_HAUTE_SAISON:this.SINGLE_HAUTE_SAISON,
      DOUBLE_HAUTE_SAISON:this.DOUBLE_HAUTE_SAISON,
      status_room:"RESERVE",
      status_reservation: "INITIALISER",    
      startDate : this.end,
      endDate : realEnd,
      startFiltre:this.endfiltreSearsh,
      endFiltre: formatDate(this.reservationChambreForm.get('endDate').value, 'yyyy-MM-dd', 'en'),
      number_guests : 0,
      number_children :this.reservationChambreForm.get('number_children').value,
      number_adulte:this.reservationChambreForm.get('number_adulte').value,
      number_persons:this.nbp,
      number_days:this.Days,
      comment : this.reservationChambreForm.get('comment').value,
      extra : this.reservationChambreForm.get('extra').value,
      price : this.priceTotal,
      tarifType:this.taarifType,
      remark:this.reservationChambreForm.get('remarque').value
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
    }, err => {
      console.log('err>>>',err);
      this.showNotification(
       'snackbar-danger',
        err,
       'top',
       'end'
     );
   })
  
  }

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
