


import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, EventClickArg } from '@fullcalendar/core'; // include this line
import interactionPlugin, { ThirdPartyDraggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from "@fullcalendar/timegrid";// a plugin
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogreservationnInfosComponent } from './dialogreservationn-infos/dialogreservationn-infos.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
const req = require('superagent');
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chambre-reservation',
  templateUrl: './chambre-reservation.component.html',
  styleUrls: ['./chambre-reservation.component.scss']
})
export class ChambreReservationComponent implements OnInit {

  calendarOptions: any;
  statusReservation:any ;
  status: any;
  backgroundColor:any;
  startDate:any;
  endDate:any;
  roomType:any;
  roombackgroundColor : any;
  nbp:number;
  isClicked = false;
  isClicked2 = false;
  isClicked3 = false;
  isClicked4 = false;
  isClicked5 = false;
  isClicked6 = false;
  isClicked7 = false;
  isClicked8 = false;
  isClicked9 = false;
  count=1;
  count2=1;
  count3=1;
  count4=1;
  count5=1;
  count6=1;
  count7=1;
  count8=1;
  count9=1;
  roomName:any;






   //used for fulcalandar
   @ViewChild('itemcont') itemcont: ElementRef;
   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;
   @ViewChild('external') external: ElementRef;
   
   ApiPath = environment.API 


   cal = new FormGroup({
    date1: new FormControl(''),
    date2: new FormControl(''),
  });


  constructor(
    public dialog: MatDialog,
    public _router: Router,
    public _reservationService: ReservationServiceService,
    private snackBar: MatSnackBar,
  ) {
    forwardRef(() => Calendar);
   }

  ngOnInit(): void {
    this.initfullcalendar()
  }



initfullcalendar = () => {
    
    this.calendarOptions = {
 
       plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin,],//Required to detect dateClick actions, selectable actions, and event drag-n-drop & resizing
       timeZone: 'local',
       initialView: "dayGridWeek",//set the initial view when the calendar loads
       weekends: true ,// initial value to enable and desable set weekends 
       aspectRatio: 1.4,//Sets the width-to-height aspect ratio of the calendar
       locale: 'fr',//enable change language
      // editable: true,//enable editing
       headerToolbar: {//set headerToolbar setting
         left: 'prev,next',
         center: 'title',
         right: '',
       },
       titleFormat: { // will produce something like "Tuesday, September 18, 2018"
         year: 'numeric',
         month: 'short',
         day: 'numeric',
         
       },
       dayHeaderFormat: {//set dayHeaderFormat setting
         weekday: 'short',
         day: 'numeric',
         month: 'short',
     
       },
       eventTimeFormat: {//set eventTimeFormat setting
         hour: "numeric",
         minute: "2-digit",
         meridiem: "short",
      
       },
       eventColor: 'rgb(205, 241, 255)',//add color for all events
       eventTextColor: 'black',//set text color for all events
       firstDay: 1,//start with monday
       selectable: false,//enable selecting
       buttonText: {// enable change buttonText names
         today: 'Aujourd\'hui',
         month: 'Mois',
         dayGridWeek: 'Cette semaine',
         list: 'Cette semaine',
         next: '',
         prev: ''
 
       },
       droppable: true,//enable drag and ddrop
       displayEventTime:true,
     //  events: this.events
      refetchResourcesOnNavigate: true,
       events:this.getEventApi.bind(this), 
       allDayText:'toute la journée',
       eventDisplay:'auto',
       timeFormat: 'H(:mm)',
      eventClick: this.handleEventClick.bind(this),
      validRange: this.validRangeClick.bind(this),
  
     eventContent: function(arg:any) {
      let italicEl = document.createElement('i')
     
       
      if (arg.event) {
        italicEl.innerHTML = `
       
        <div style="background-color:${arg.event._def.extendedProps.roomID.other}; display:flex;flex-direction: column;width:100%; height:50px; border-left: 5px solid ${arg.event._def.extendedProps.roomID.backgroundColor}">
          
           <div style="justify-content: space-between ; display:flex;height:20px">

                 

                 <p style="width:35px;height:10px; border-radius:8px;font-size:8px; margin-top:5px;padding-left:5px;padding-bottom:5px;color:white;font-family: Roboto">${arg.event._def.extendedProps.roomID.name}</p>
               
                 <div style="margin-right:5px;">
                   
                    <span  style="color:white; font-size:12px"   class="material-icons">date_range</span>
            
                 </div> 

           </div>


           <div style="justify-content: space-between ; display:flex;">
                
                <div style="display:flex;flex-direction:row ;">
                    <span  style="margin-top:16px;color:white;font-size:12px"    class="material-icons">person</span>
                    <p style="margin-top:16px; color:white;font-size:10px;font-family: Roboto">${arg.event._def.extendedProps.number_persons}</p>

                    <span  style="margin-top:18px;color:white;font-size:11px;margin-left:2px;-moz-transform: scaleX(-1); -o-transform: scaleX(-1);
                    -webkit-transform: scaleX(-1);
                    transform: scaleX(-1);
                    filter: FlipH;
                    -ms-filter: "FlipH";    class="material-icons">brightness_3</span>

                    <p style="margin-top:16px; color:white;font-size:10px;font-family: Roboto">${arg.event._def.extendedProps.number_days}</p>
                </div>
              

                <div style="display:flex;flex-direction:column; margin-bottom:190px">
                  
          
                   <span style="font-family: Roboto; font-size:10px;color:white">${(arg.event._instance.range.start).toLocaleDateString('locales', { day:"numeric",hour:"numeric"})}</span>
            
                   <span style="font-family: Roboto; serif; font-size:10px ;margin-bottom:120px;color:white" > ${(arg.event._instance.range.end).toLocaleDateString('locales', {day:"numeric",hour:"numeric"})}</span>
                </div>


                <div style="display:flex;flex-direction:column">
                    <p style="margin-top:5px; margin-right:2px;font-family: Roboto;font-size:9px;color:white">${arg.event._def.extendedProps.clientID.first_name} <br> ${arg.event._def.extendedProps.clientID.last_name} </p>
                   
                 </div>
           
               
             </div>
       
       </div>
        
  `
      }
      let arrayOfDomNodes = [ italicEl ]
      return { domNodes: arrayOfDomNodes }
      
     }
     
  
  
    };
 
   }


getEventApi(info:any,successCallback:any, failureCallback:any, src:any){
 

   

     if(this.statusReservation == 'yellow' || this.statusReservation == 'red' || this.statusReservation == 'gray'){
       return    ( req.get(this.ApiPath + 'reservations/filter?color='+this.statusReservation)
                .type('json')
                .query({
                  start: info.start.valueOf(),
                  end: info.end.valueOf()
                })
                .end(function(err:any, res:any) {
                  
                   
                 
                  if (err) {
                    failureCallback(err);
                  } else {
          
                    successCallback(

                      res.body
                      
                    
                    )
                  }
                }))
                
     }
     else if( this.statusReservation == 'all'){
      return    ( req.get(this.ApiPath + 'reservations/filter?color=')
      .type('json')
      .query({
        start: info.start.valueOf(),
        end: info.end.valueOf()
      })
      .end(function(err:any, res:any) {
        
      
        if (err) {
          failureCallback(err);
        } else {

          successCallback(

            res.body
            
          
          )
        }

      }))
     }
     else if( this.roomName == 'Ruppia' || this.roomName == 'Ciconia' || this.roomName == 'Amorpha' || this.roomName == 'Marabou' || this.roomName == 'Brecon' || this.roomName == 'Colony' || this.roomName == 'Cicogne' || this.roomName == 'Bonnelli' || this.roomName == 'Toute la villa'){
      return    ( req.get(this.ApiPath + 'reservations/rooms?name='+this.roomName)
      .type('json')
      .query({
        start: info.start.valueOf(),
        end: info.end.valueOf()
      })
      .end(function(err:any, res:any) {
        
       
        if (err) {
          failureCallback(err);
        } else {

          successCallback(

            res.body
            
          
          )
        }

      }))
     }
     
     else  {

      return    ( req.get(this.ApiPath + 'reservations/filter?color=')
      .type('json')
      .query({
        start: info.start.valueOf(),
        end: info.end.valueOf()
      })
      .end(function(err:any, res:any) {
        
        
        if (err) {
          failureCallback(err);
        } else {

          successCallback(

            res.body
            
          
          )
        }

      }))
     }

}


handleEventClick(clickInfo: EventClickArg) {

  console.log('clickInfo>>>', clickInfo.event.extendedProps);
  
  
      if(clickInfo.event.extendedProps.roomID.DOUBLE_BAS_SAISON_PRICE){
          this.roomType = "double"
      }
      else if (clickInfo.event.extendedProps.roomID.DOUBLE_HAUTE_SAISON_PRICE){
          this.roomType = "double"
      }
      else if(clickInfo.event.extendedProps.roomID.SINGLE_BAS_SAISON_PRICE){
          this.roomType = "single"
      }
      else if(clickInfo.event.extendedProps.roomID.SINGLE_HAUTE_SAISON_PRICE) {
          this.roomType = "single"
      }
     
      
      const dialogRef = this.dialog.open(DialogreservationnInfosComponent, {
        disableClose: true,
       // panelClass: 'custom-dialog-container',
          width:'1500px',
          height:'900px',
         
       
        data:{
          firstName: clickInfo.event.extendedProps.clientID.first_name,
          lastName: clickInfo.event.extendedProps.clientID.last_name,
          nbp: clickInfo.event.extendedProps.number_persons,
          nb_days: clickInfo.event.extendedProps.number_days,
          nb_children: clickInfo.event.extendedProps.number_children,
          price: clickInfo.event.extendedProps.price,
          title: clickInfo.event.extendedProps.roomID.name,
          start: clickInfo.event._instance?.range.start.toLocaleDateString('locales', { weekday:"long", year:"numeric", month:"short", day:"numeric",hour:"numeric"}),
          end: clickInfo.event._instance?.range.end.toLocaleDateString('locales', { weekday:"long", year:"numeric", month:"short", day:"numeric",hour:"numeric"}),
          last: clickInfo.event.extendedProps.last,
          roomID: clickInfo.event.extendedProps.roomID._id,
          status_room: clickInfo.event.extendedProps.roomID.status,
          selected:0,
          reservation_ID: clickInfo.event.extendedProps._id,
          comment:clickInfo.event.extendedProps.comment,
          startFiltre:clickInfo.event.extendedProps.startFiltre,
          endFiltre:clickInfo.event.extendedProps.endFiltre,
          number_adulte:clickInfo.event.extendedProps.number_adulte,
          extra:clickInfo.event.extendedProps.extra,
          DOUBLE_BAS_SAISON: false,
          DOUBLE_HAUTE_SAISON: false,
          SINGLE_BAS_SAISON: false,
          SINGLE_HAUTE_SAISON: false,
          tarifType: clickInfo.event.extendedProps.tarifType,
          roomType:this.roomType,
          remark:clickInfo.event.extendedProps.remark,
          number_phone:clickInfo.event.extendedProps.clientID.number_phone,
          priceTotal: clickInfo.event.extendedProps.priceTotal,
          remiseTotal: clickInfo.event.extendedProps.remiseTotal,
        //  menu1:clickInfo.event.extendedProps.listmenuID[0].typeRepas,
         // menu2:clickInfo.event.extendedProps.listmenuID[1].typeRepas
        }
      });
    
    
        
       dialogRef.afterClosed().subscribe(result => {
          console.log('result>>>', result);
          
          const calendarApi = this.calendarComponent.getApi();
          calendarApi.next(); // call a method on the Calendar object
          calendarApi.prev();
          
          const id = result.reservation_ID;

    
         if(result.selected === 1){
             this.status = "RESERVE" ;
             this.backgroundColor ="yellow";

         }
         else if (result.selected === 2){
             this.status = "OCCUPE";
             this.backgroundColor = "red";
         }
         else if(result.selected === 3) {
             this.status = "FERMER";
             this.backgroundColor = "gray"
         }
      
         

         this.verifyRoomColor(result.title)
         this.numberPersons(result.number_adulte, result.nb_children)
         const datatosent = {
           roomType: "room" ,
           first_name : result.firstName,
           last_name : result.lastName,
           name : result.title,
           backgroundColor:this.backgroundColor,
           other:this.roombackgroundColor,
           last:result.endFiltre+'T11:00:00',
           SINGLE_BAS_SAISON: result.SINGLE_BAS_SAISON,
           DOUBLE_BAS_SAISON:result.DOUBLE_BAS_SAISON,
           SINGLE_HAUTE_SAISON:result.SINGLE_BAS_SAISON,
           DOUBLE_HAUTE_SAISON:result.DOUBLE_HAUTE_SAISON,
           status_room: this.status,
           status_reservation: "INITIALISER",    
           startDate : result.startFiltre+'T13:00:00',
           endDate: result.endFiltre+'T11:00:00',
           startFiltre: result.startFiltre,
           endFiltre: result.endFiltre,
           number_guests: 0,
           number_children:result.nb_children,
           number_adulte:result.number_adulte,
           number_persons:this.nbp,
           number_days:result.nb_days,
           number_phone:result.number_phone,
           comment: result.comment,
           extra:  result.extra,
           price : result.price,
           tarifType:result.tarifType,
           remark :result.remark,
           number_cin:result.number_cin,
           remiseTotal:result.remiseTotal


         }
       
       
         
         this._reservationService.updateReservation(id,datatosent).subscribe((data :any) => {
         
                this.showNotification(
                  'snackbar-success',
                  data.message,
                  'top',
                  'end'
                )
                const calendarApi = this.calendarComponent.getApi();
                calendarApi.next(); // call a method on the Calendar object
                calendarApi.prev();
         }, err => {
           if(err != 'Not Found'){
              
                this.showNotification(
                'snackbar-danger',
                  err,
                'top',
                'end'
              );
           }
               
       })

     
     
         
      })
    
    
    
    
    
}


numberPersons(nba: number, nbc:number){
  this.nbp = nba + nbc
}


verifyRoomColor(roomName:any){
  if (roomName === 'Ruppia'){
    this.roombackgroundColor = '#deaa89';
}
else if(roomName === 'Marabou'){
    this.roombackgroundColor = '#d29e6d';
}
else if(roomName === 'Colony'){
     this.roombackgroundColor = '#2896bc';
}
else if (roomName === 'Ciconia'){
     this.roombackgroundColor = '#ce711a';
}
else if (roomName === 'Cicogne'){
  this.roombackgroundColor = '#dcc379';
}
else if (roomName === 'Brecon'){
  this.roombackgroundColor = '#246880';
}
else if (roomName === 'Bonnelli'){
  this.roombackgroundColor = '#997259';
}
else if (roomName === 'Amorpha'){
  this.roombackgroundColor = '#79c296';
}else{
  this.roombackgroundColor = '#7aa0b8'
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
  
setColorEvents(color:string){
  
  this.statusReservation= color;
 
  const calendarApi = this.calendarComponent.getApi();
  calendarApi.next(); // call a method on the Calendar object
  calendarApi.prev();

}

gotoReservation(){
  this._router.navigate(['reservation/reserver/#'])
}

validRangeClick(nowDate:any){

if(this.startDate && this.endDate){
  const startfiltre = formatDate(this.startDate, 'yyyy-MM-dd', 'en')+'T13:00:00';
  const endfiltre = formatDate(this.endDate, 'yyyy-MM-dd', 'en')+'T11:00:00';
 
  return {
    start: startfiltre,
    end: endfiltre
  };
}

}

searchDateRange(){
 
  this.startDate = this.cal.value.date1;
  this.endDate = this.cal.value.date2;   
  const calendarApi = this.calendarComponent.getApi();
  calendarApi.next(); // call a method on the Calendar object
  calendarApi.prev();
}



Reload(){
  window.location.reload();
}

getRuppiaRooms(event:any){

 
 if(event){
   this.count++
   
   
   if(this.count % 2 == 0){
       this.isClicked = true;
       this.roomName = 'Ruppia';
       const calendarApi = this.calendarComponent.getApi();
       calendarApi.next(); // call a method on the Calendar object
       calendarApi.prev();
   }else{
      this.isClicked = false;
      this.roomName = '';
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.next(); 
      calendarApi.prev();
   }
 }

}

getCiconiaRooms(event:any){
  if(event){
    this.count2++

   if(this.count2 % 2 == 0){

    this.isClicked2 = true;
    this.roomName = 'Ciconia';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked2 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
}

getAmorphaRooms(event:any){
  if(event){
    this.count3++

   if(this.count3 % 2 == 0){

    this.isClicked3 = true;
    this.roomName = 'Amorpha';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked3 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
  
}

getMarabouRooms(event:any){
  if(event){
    this.count4++

   if(this.count4 % 2 == 0){

    this.isClicked4 = true;
    this.roomName = 'Marabou';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked4 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
}


getBreconRooms(event:any){
  if(event){
    this.count5++

   if(this.count5 % 2 == 0){

    this.isClicked5 = true;
    this.roomName = 'Brecon';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked5 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
}


getColonyRooms(event:any){
  if(event){
    this.count6++

   if(this.count6 % 2 == 0){

    this.isClicked6 = true;
    this.roomName = 'Colony';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked6 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
}

getCicogneRooms(event:any){
  if(event){
    this.count7++

   if(this.count7 % 2 == 0){

    this.isClicked7 = true;
    this.roomName = 'Cicogne';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked7 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
}


getBonnelliRooms(event:any){

  if(event){
    this.count8++

   if(this.count8 % 2 == 0){

    this.isClicked8 = true;
    this.roomName = 'Bonnelli';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked8 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }

}


getVillaRooms(event:any){
  if(event){
    this.count9++

   if(this.count9 % 2 == 0){

    this.isClicked9 = true;
    this.roomName = 'Toute la villa';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); // call a method on the Calendar object
    calendarApi.prev();


   }else{
    this.isClicked9 = false;
    this.roomName = '';
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.next(); 
    calendarApi.prev();
   }

  }
}



}


