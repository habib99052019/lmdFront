


import { Component, ElementRef, forwardRef, OnInit, ViewChild } from '@angular/core';
import { Calendar, EventClickArg } from '@fullcalendar/core'; // include this line
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import timeGridPlugin from "@fullcalendar/timegrid";// a plugin
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { DialogreservationnInfosComponent } from './dialogreservationn-infos/dialogreservationn-infos.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
const req = require('superagent');

@Component({
  selector: 'app-chambre-reservation',
  templateUrl: './chambre-reservation.component.html',
  styleUrls: ['./chambre-reservation.component.scss']
})
export class ChambreReservationComponent implements OnInit {

  calendarOptions: any;
  colorEvent:any ;
   //used for fulcalandar
   @ViewChild('itemcont') itemcont: ElementRef;
   // references the #calendar in the template
   @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('external') external: ElementRef;

  constructor(
    public dialog: MatDialog,
    public _router: Router
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
         left: 'prev,dayGridWeek,next',
         center: 'title',
         right: '',
       },
       titleFormat: { // will produce something like "Tuesday, September 18, 2018"
         year: 'numeric',
         month: 'short',
         day: 'numeric'
       },
       dayHeaderFormat: {//set dayHeaderFormat setting
         weekday: 'long',
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
       selectable: true,//enable selecting
       buttonText: {// enable change buttonText names
         today: 'Aujourd\'hui',
         month: 'Mois',
         dayGridWeek: 'Cette semaine',
         list: 'Cette semaine',
         next: 'suivant',
         prev: 'Précédente'
 
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
     eventContent: function(arg:any) {
      let italicEl = document.createElement('i')
       console.log('eventcontent',arg.event)
      if (arg.event) {
        italicEl.innerHTML = `
       
        <div style="background-color:white;box-shadow: -4px 1px 14px 1px rgba(0,0,0,0.28);
        -webkit-box-shadow: -4px 1px 14px 1px rgba(0,0,0,0.28);
        -moz-box-shadow: -4px 1px 14px 1px rgba(0,0,0,0.28); display:flex;flex-direction: column;width:100%; height:50px">
          
           <div style="justify-content: space-between ; display:flex;height:20px">

                 <div style="width: 10px; height: 10px;border-radius: 20px;background-color: ${arg.event._def.ui.backgroundColor};">
                 </div>

                 <p style="background-color:${arg.event._def.extendedProps.other} ; width:35px;height:10px; border-radius:8px;font-size:8px; margin-top:5px;padding-left:5px;padding-bottom:5px">${arg.event._def.title}</p>
               
                 <div style="margin-right:5px;">
                   
                    <span  style="color:#ff6600; font-size:12px"   class="material-icons">date_range</span>
            
                 </div> 

           </div>


           <div style="justify-content: space-between ; display:flex;">
                
                <div style="display:flex;flex-direction:row ;">
                    <span  style="margin-top:12px;color:#ff6600;font-size:12px"    class="material-icons">person</span>
                    <p style="margin-top:11px; color:#ff6600;font-size:10px">${arg.event._def.extendedProps.nbp}</p>
          
                </div>
              

                <div style="display:flex;flex-direction:column; margin-bottom:50px">
                  
          
                   <span style="font-family: Times New Roman, Times, serif; font-size:10px">${(arg.event._instance.range.start).toLocaleDateString('locales', { weekday:"long", year:"numeric", month:"short", day:"numeric",hour:"numeric"})}</span>
            
                   <span style="font-family: Times New Roman, Times, serif; font-size:10px " > ${(arg.event._instance.range.end).toLocaleDateString('locales', { weekday:"long", year:"numeric", month:"short", day:"numeric",hour:"numeric"})}</span>
                </div>


                <div style="display:flex;flex-direction:column">
                    <p style="margin-top:5px; margin-right:5px;font-family: Times New Roman, Times, serif;font-size:9px ">${arg.event._def.extendedProps.firstName} <br> ${arg.event._def.extendedProps.lastName} </p>
                   
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
 
    console.log('info', info);

     if(this.colorEvent){
       return    ( req.get('http://localhost:3001/cleansports/api/events/color?color='+this.colorEvent)
                .type('json')
                .query({
                  start: info.start.valueOf(),
                  end: info.end.valueOf()
                })
                .end(function(err:any, res:any) {
                   console.log("src>>>",src);
                   
                  console.log('response>>>', res)
                  if (err) {
                    failureCallback(err);
                  } else {
          
                    successCallback(

                    res.body.events
                      
                    
                    )
                  }
                }))
                
     }
     else  {

      return    ( req.get('http://localhost:3001/cleansports/api/events/color?color=')
      .type('json')
      .query({
        start: info.start.valueOf(),
        end: info.end.valueOf()
      })
      .end(function(err:any, res:any) {
         console.log("src>>>",src);
         
        console.log('response>>>', res)
        if (err) {
          failureCallback(err);
        } else {

          successCallback(

          res.body.events
            
          
          )
        }

      }))
     }

}


handleEventClick(clickInfo: EventClickArg) {
      console.log('item>>>', clickInfo.event)
    
     
      const dialogRef = this.dialog.open(DialogreservationnInfosComponent, {
      
        width: '700px',
        height:'350px',
       
        data:{
          firstName: clickInfo.event.extendedProps.firstName,
          lastName: clickInfo.event.extendedProps.lastName,
          nbp: clickInfo.event.extendedProps.nbp,
          isReserve: clickInfo.event.extendedProps.isReserve,
          isOccupe: clickInfo.event.extendedProps.isOccupe,
          isFermer:clickInfo.event.extendedProps.isFermere,
          title:clickInfo.event._def.title,
          start:clickInfo.event._instance?.range.start.toLocaleDateString('locales', { weekday:"long", year:"numeric", month:"short", day:"numeric",hour:"numeric"}),
          end:clickInfo.event._instance?.range.end.toLocaleDateString('locales', { weekday:"long", year:"numeric", month:"short", day:"numeric",hour:"numeric"}),
          last: clickInfo.event.extendedProps.last
        }
      });
    
    
        
       dialogRef.afterClosed().subscribe(result => {
        console.log("data from dialog add team >>>", result)
     
         
      })
    
    
    
    
    
}
    
    
setColorEvents(color:string){
  
  this.colorEvent= color;
  console.log('color yellow', this.colorEvent);
// window.location.reload();

   
}
gotoReservation(){
  this._router.navigate(['reservation/reserver/#'])
}

















}
