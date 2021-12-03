import { Component, ViewChild, OnInit, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, ElementRef, Renderer2 } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/angular';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { reservationChambre } from './chambre.model';
import { ChambreFormDialogComponent } from './form-dialog/form-dialog.component';


import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, startOfDay , startOfWeek, endOfWeek , isSameWeek} from 'date-fns';
import { colors } from '../demo-utils/colors';




import {ReservationServiceService} from '../../core/service/reservation-service.service'
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { ChambreAddFormDialogComponent } from '../chambre-list/form-dialog/form-dialog.component';
import { Subject } from "rxjs";

@Component({
  selector: 'app-chambre',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './chambre.component.html',
  styleUrls: ['./chambre.component.scss'],
  
})
export class ChambreComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: any; 
  @ViewChild('viewEvent') showEvent : TemplateRef<any>;
  @ViewChild('angularCalendar') angularCalendar;
  reservationChambre: reservationChambre | null;
  public addCusForm: FormGroup;
  dialogTitle: string;
  filterOptions = 'All';
  calendarData: any;
  RoomreservationList : any
  rooms : any 
  Data : any
  checkedRoom = true;
  toutLesChambre = false;
  filterItems: string[] = [];
  roomsList : any
  calendarEvents: EventInput[];
  tempEvents: EventInput[];
  eventData : any = []
  start : any
  end : any
  modalData : any
  isContent = false

  public filters = [];
  reservation: any;
  room: any;
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  events : any = [];
  empty_element : any = [];
  array1 : any = [];
  

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private reservationService : ReservationServiceService,
    private cdr: ChangeDetectorRef,
    private render:Renderer2,
    private elementRef:ElementRef
  ) {
    this.dialogTitle = 'Add New Event';
    this.reservationChambre = new reservationChambre({});
    this.addCusForm = this.createCalendarForm(this.reservationChambre);
   
  }
  refresh= new Subject<void>();

  ngOnInit() { 
    this.getRoomReservations();
    this.getRoomsList();
 
     
     
  }
  ngAfterViewChecked() {

    if(document.getElementsByClassName('morning').length == 0 && 
    document.getElementsByClassName('cal-time-label-column').length == 2){
     
      var h1_morning = document.createElement("h1");
      this.render.addClass(h1_morning,"morning");
      var newContent = document.createTextNode('Matin');
      h1_morning.appendChild(newContent);


      var h1_evening = document.createElement("h1");
      this.render.addClass(h1_evening,"evening");
      var newContent = document.createTextNode('Soir');
      h1_evening.appendChild(newContent);

      var currentDiv = document.getElementsByClassName('cal-time-label-column');
 
      currentDiv[0].appendChild(h1_morning);
      currentDiv[0].appendChild(h1_evening);
      document.getElementsByClassName('cal-time-label-column')[1].remove();
    }
  }

  getRoomsList(){
    this.reservationService.getRoomList().subscribe((data : any)=>{
     this.roomsList = data;
     this.filterItems= data.map(room=>room.name);
     this.roomsList = this.roomsList.map(room => {return {...room , checked : true}})
    })
  }

  getRoomReservations(){
    this.reservationService.getReservationList().subscribe((data : any ) => {
        this.RoomreservationList = data.filter(reservation => reservation.type === 'room');
        this.reservationService.getRoomList().subscribe((rooms : any) =>{
          this.rooms = rooms.map(room => { return { name: room.name ,id: room._id};
          });           
         this.reservationService.getUserList().subscribe((users : any)=> {
          let mergedList = this.RoomreservationList.map(reservation => {
            let rooms = this.rooms.find(room => room.id === reservation.roomID)
            return { ...rooms, ...reservation}
              })  
              this.Data = mergedList.map(reservation => {
                let user = users.find(user => user._id === reservation.clientID)
                return {...user , ...reservation }
                  }) 
                 
                  if (this.angularCalendar != undefined && this.angularCalendar.view.allDayEventRows.length === 0 ){
                  for (let i = 0; i < this.angularCalendar.days.length; i++){
                   this.empty_element.push({
                      start: this.angularCalendar.days[i].date,
                      allDay: true,
                      status : "occupe",
                      color: {
                        primary: '#FFF',
                        secondary: '#FFF',
                      },
                    },{
                    start: this.angularCalendar.days[i].date,
                    status : "occupe",
                    allDay: true,
                    color: {
                      primary: '#FFF',
                      secondary: '#FFF',
                    },
                  });

                    this.array1.push({
                      allDay : true,
                      title  : 'Amorpha',
                      status : "occupe",
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#FFE2D9'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Bonnelli',
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#D2F6D5'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Brécon',
                      status : "occupe",
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#F6E6C3'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Cicogne',
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#C4D6F0'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Ciconia',
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#82AFA7'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Colony',
                      status : "occupe",
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#F94B4B'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Marabou',
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#AA5D5D'
                      } ,
                    },
                    {
                      allDay : true,
                      title  : 'Ruppia',
                      start : this.angularCalendar.days[i].date,
                      color  :{
                      primary : '#ad2121',
                      secondary: '#E32500'
                      } ,
                    },)  
                  }
                  this.events.push(...this.array1 , ...this.empty_element , ...this.array1);
       
                }
                  this.refresh.next();
                  this.verifyEvent()
         })
        })
    })
  }
  toggle(event : any){
   if (event.target.checked === true){
     this.events = this.events.filter(event => event.status === 'occupe');
   }
  }
  verifyEvent(){
    this.cdr.detectChanges();
    this.refresh.next();
    for (let i = 0 ; i < this.angularCalendar.view.allDayEventRows.length; i++ ){
      for (let j = 0; j < this.angularCalendar.view.allDayEventRows[i].row.length ; j++){
        
             this.Data.forEach(event => {
              
                 if (
                   formatDate(new Date (event.startDate), 'yyyy-MM-dd', 'en') <= formatDate (new Date (this.angularCalendar.view.allDayEventRows[i].row[j].event.start ) , 'yyyy-MM-dd', 'en' ) 
                && formatDate(new Date (event.endDate), 'yyyy-MM-dd', 'en') >= formatDate (new Date (this.angularCalendar.view.allDayEventRows[i].row[j].event.start ) , 'yyyy-MM-dd', 'en' ) 
                 && event.name.toUpperCase()  ===  this.angularCalendar.view.allDayEventRows[i].row[j].event.title?.toUpperCase()
                 ) {
                  this.angularCalendar.view.allDayEventRows[i].row[j].event.title = event.name 
                  /// dont forget to put full name of client in the title
                  this.angularCalendar.view.allDayEventRows[i].row[j].event.color.primary = "#F49E39"
                  this.angularCalendar.view.allDayEventRows[i].row[j].event.actions = this.actions
                 }

             });
      }
    }
    this.refresh.next();
    this.cdr.detectChanges();
  }
  

  fillCalendar(){ 
    this.cdr.detectChanges();
  if (this.angularCalendar.view.allDayEventRows.length === 0){
   for (let i = 0; i < this.angularCalendar.days.length; i++){
    this.events.push({
      allDay : true,
      title  : 'Amorpha',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#FFE2D9'
      } ,
    },
    {
      allDay : true,
      title  : 'Bonnelli',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#D2F6D5'
      } ,
    },
    {
      allDay : true,
      title  : 'Brécon',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#F6E6C3'
      } ,
    },
    {
      allDay : true,
      title  : 'Cicogne',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#C4D6F0'
      } ,
    },
    {
      allDay : true,
      title  : 'Ciconia',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#82AFA7'
      } ,
    },
    {
      allDay : true,
      title  : 'Colony',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#F94B4B'
      } ,
    },
    {
      allDay : true,
      title  : 'Marabou',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#AA5D5D'
      } ,
    },
    {
      allDay : true,
      title  : 'Ruppia',
      start : this.angularCalendar.days[i].date,
      color  :{
      primary : '#ad2121',
      secondary: '#E32500'
      } ,
    },)  
    
  } 
    
    }
     this.cdr.detectChanges();
     this.verifyEvent();
  }
  

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fas fa-pencil-alt"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      
      }
    }
  ];
  
  

  initFilters(){
    this.getRoomsList()
  }
  
  changeView(event : any){
    if (this.end){
      console.log(this.end , event.value)
      this.calendarComponent.options.validRange = {
        start: formatDate(event.value , 'yyyy-MM-dd' , 'en'),
        end : formatDate(this.end , 'yyyy-MM-dd' , 'en'),
     
      };
    }
  };
  changeView2(event : any){
    if (this.start){
      console.log(this.start , event.value)
      this.calendarComponent.options.validRange = {
        start : formatDate(this.start , 'yyyy-MM-dd' , 'en'),
        end: formatDate(event.value , 'yyyy-MM-dd' , 'en'),
       };
    } 
  }
  calendarOptions : CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: '',
      right: 'dayGridMonth,timeGridWeek',
    },
    initialView: 'dayGridMonth',
    slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: false, hour12: false }, eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false }, 
    weekends: true,
    editable: false,
    selectable: true,
    slotMinTime: "08:00",
    validRange: {
      start: 'default',
      end: 'default'
    },
    selectMirror: true,
    dayMaxEvents: false,
    // select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    displayEventTime: false,
  };
 

  handleDateSelect(selectInfo: DateSelectArg) {
    this.addNewEvent();
  }

  addNewEvent() {
    const dialogRef = this.dialog.open(ChambreAddFormDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        window.location.reload();
      }
    })
  }

  changeCategory(event: MatCheckboxChange, filter) {
    console.log("🚀 ~ file: chambre.component.ts ~ line 442 ~ ChambreComponent ~ changeCategory ~ filter", filter)
    console.log(event , "event") 
    // this.toutLesChambre = false   
    if (event.checked) {
      // filter.checked = true
      this.filterItems.push(filter.name);
    } else {
      // filter.checked = false
      this.filterItems.splice(this.filterItems.indexOf(filter.name), 1);
    }
    this.filterEvent(this.filterItems);
    console.log("🚀 ~ file: chambre.component.ts ~ line 453 ~ ChambreComponent ~ changeCategory ~ filterItems", this.filterItems)
  }
  filterEvent(element) {
    const list = this.events.filter((x) =>
      element.map((y) => y).includes(x.title)  || x.title == undefined
    );
    console.log("🚀 ~ file: chambre.component.ts ~ line 459 ~ ChambreComponent ~ filterEvent ~ list", list)
    this.angularCalendar.events = list;
    console.log(this.angularCalendar.events)
    this.cdr.detectChanges();
    this.refresh.next();
  }

  reset(event: any) {
    if (event.checked){
      this.toutLesChambre = true
      this.initFilters()
      this.calendarOptions.events = this.eventData;
    }
    else {
      this.toutLesChambre = false
    }
  }

  

  handleEventClick(clickInfo: EventClickArg) {
    this.reservationService.getReservation(clickInfo.event._def.publicId).subscribe((reservation : any) => {
      this.reservationService.getRoomById(reservation.roomID).subscribe((room:any) => {
        this.reservationService.getUserById(reservation.clientID).subscribe((user : any ) => {
          this.modalData = {
            first_name : user.first_name,
            last_name : user.last_name,
            roomName : room.name ,
            number_guests : reservation.number_guests,
            number_children : reservation.number_children,
            price : reservation.price , 
            startDate : reservation.startDate,
            endDate : reservation.endDate,
            status : room.status
          }
          console.log(this.modalData)
          this.modalService.open( this.showEvent, {

          });

          
        })
      }) 
    })
  }

  

  editEvent(eventIndex, calendarData) {
    const calendarEvents = this.calendarEvents.slice();
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]);
    singleEvent.id = calendarData.id;
    singleEvent.title = calendarData.title;
    singleEvent.start = calendarData.startDate;
    singleEvent.end = calendarData.endDate;
    singleEvent.className = this.getClassNameValue(calendarData.category);
    singleEvent.groupId = calendarData.category;
    singleEvent.details = calendarData.details;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array

    this.calendarOptions.events = calendarEvents;
  }

  handleEvents(events: EventApi[]) {
    // this.currentEvents = events;
  }

  createCalendarForm(calendar): FormGroup {
    return this.fb.group({
      id: [calendar.id],
      title: [
        calendar.title,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
      category: [calendar.category],
      startDate: [calendar.startDate, [Validators.required]],
      endDate: [calendar.endDate, [Validators.required]],
      details: [
        calendar.details,
        [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')],
      ],
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  getClassNameValue(category) {
    let className: string;

    if (category === 'Colony') className = '#FFA500';
    else if (category === 'Bonelhi') className = '#87CEEB';
    else if (category === 'Marabon') className = '#0000FF';
    else if (category === 'Brecoir') className = '#ff0000';
    else if (category === 'Ciconia') className = '#964B00';
    else if (category === 'Amorpha') className = '#FFC0CB';
    else if (category === 'Ruppia') className = '#8F00FF';
    return className;
  }



  getColorForEvent( name ): String{
    var color = "#8F00FF"
    switch (name) {
      case "Colony":
          color =  '#FFA500';
          break; 
      case "Zeus":
         color =  '#0000FF';
         break; 
      case "Ciconia":
        color = '#964B00'
        break; 
      case "Bonelhi":
        color = '#FFC0CB'
        break; 
      default:
        break
     }
     return color
  }

}
