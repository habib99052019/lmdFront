import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
@Component({
  selector: 'app-edit-chambre-reservation',
  templateUrl: './edit-chambre-reservation.component.html',
  styleUrls: ['./edit-chambre-reservation.component.sass']
})
export class EditChambreReservationComponent implements OnInit {

  reservationForm: FormGroup;
  formdata = {
    first: 'Pooja',
    last: 'Sarma',
    email: 'test@example.com',
    gender: 'female',
    mobile: '123456789',
    city: 'Surat',
    arriveDate: '2020-02-17T14:22:18Z',
    departDate: '2020-02-19T14:22:18Z',
    totalPerson: '3',
    roomType: 'Delux',
    address: '101, Elanxa, New Yourk',
    uploadImg: '',
    note: 'test commit',
  };
  max_guests = 0;
  minDate : any ;
  maxDate : any ;
  todayDate = new Date() ;
  RoomPrice = 0;
  Days = 0 ;
  randomKey = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  priceTotal = 0;
  reservation : any ;
  room : any ; 
  user : any ;
  rooms : any;
  constructor(
    private fb: FormBuilder,
    private service : ReservationServiceService,
    private route : ActivatedRoute
    
    ) {
    
  }

  ngOnInit(){
 //  this.getReservation();
   
  }
  

  getReservation(){
    const id = this.route.snapshot.paramMap.get('id');
  
    this.service.getReservation(id).subscribe((data : any) => {
      this.reservation = data
      this.service.getRoomById(this.reservation.roomID).subscribe((room:any) => {
        this.room = room 
        this.service.getUserById(this.reservation.clientID).subscribe((user : any ) => {
          this.service.getRoomList().subscribe((data : any) => {
            this.rooms = data
            this.user = user
            this.reservationForm = this.createContactForm();
            
          })
        })
      }) 
    })
  }
 
  onSubmit() {
    console.log('Form Value', this.reservationForm.value);
  }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      first_name : [this.user?.first_name],
      last_name : [this.user?.last_name] ,
      roomID : [this.reservation?.roomID , Validators.required],
      roomName : [this.room?.name],
      startDate : [this.reservation?.startDate, Validators.required],
      endDate : [this.reservation?.endDate , Validators.required],
      number_guests : [this.reservation?.number_guests , Validators.required],
      number_children : [ this.reservation?.number_children , Validators.required],
      comment : [this.reservation?.comment],
      extra :[ this.reservation?.extra],
      price : [this.reservation?.price , Validators.required],
      status : [this.reservation?.status , Validators.required]
    });

  }
  
  showRoom(event : MatSelectChange){
    if (event.value.price){
      this.RoomPrice = event.value.price
    }
    this.calculTotal(this.Days , this.RoomPrice);
    this.max_guests = event.value.number_places;
    this.reservationForm.get('roomID').setValue(event.value._id) 
  }


  calculDateDays(event : any ){
    const temporryDate = this.reservationForm.get('endDate').value.getTime() - (1000 * 60 * 60 * 24)
    this.maxDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
    if (this.reservationForm.get('startDate').value){
      var Time = event.value.getTime() - this.reservationForm.get('startDate').value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
    }
    return 
  }
  checkDates(event : any ){
    const temporryDate = this.reservationForm.get('startDate').value.getTime() + (1000 * 60 * 60 * 24)
    this.minDate = formatDate(temporryDate , 'yyyy-MM-dd' , 'en');
    if (this.reservationForm.get('endDate').value){
      var Time = this.reservationForm.get('endDate').value.getTime()- event.value.getTime() ; 
      var Days = Time / (1000 * 3600 * 24);
      this.Days = Days
      this.calculTotal(this.Days , this.RoomPrice);
      
    }
    return
  }

   calculTotal(days : any , roomPrice : any ){
        this.priceTotal = roomPrice * days
        this.reservationForm.get('price').setValue(this.priceTotal);
     }

}
