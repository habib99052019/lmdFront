import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ReservationServiceService} from '../../../core/service/reservation-service.service'
import { FormControl,Validators,FormGroup,FormBuilder} from '@angular/forms';
import { reservationChambre } from '../../chambre/chambre.model';
import { MatSelectChange } from '@angular/material/select/select';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class ChambreAddFormDialogComponent implements OnInit{
  action: string;
  dialogTitle: string;
  chambreReservation : any;
  max_guests = 0;
  minDate : any ;
  maxDate : any ;
  todayDate = new Date() ;
  RoomPrice = 0;
  Days = 0 ;
  randomKey = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  priceTotal = 0;
  reservationChambreForm: FormGroup;
  reservationChambre: reservationChambre;
  showDeleteBtn = false;
  roomType = '';
  taarifType = '';
  extra = '';
  room : any
  Chambres = [
  {name : "Ruppia", prix_bas_Double : 315  , prix_bas_simple : 245 , prix_haut_Double : 385  , prix_haut_simple : 315 } , 
  {name : "Bonneli", prix_bas_Double : 280  , prix_bas_simple : 210 , prix_haut_Double : 350  , prix_haut_simple : 280 } ,
  {name : "Amorpha", prix_bas_Double : 315  , prix_bas_simple : 245 , prix_haut_Double : 385  , prix_haut_simple : 315 } ,
  {name : "Ciconia", prix_bas_Double : 300  , prix_bas_simple : 230 , prix_haut_Double : 370  , prix_haut_simple : 300 } ,
  {name : "Marabou", prix_bas_Double : 370  , prix_bas_simple : 300 , prix_haut_Double : 440  , prix_haut_simple : 370 } ,
  {name : "Brecon", prix_bas_Double : 405  , prix_bas_simple : 335 , prix_haut_Double : 475  , prix_haut_simple : 405 } ,
  {name : "Colony", prix_bas_Double : 455  , prix_bas_simple : 385 , prix_haut_Double : 525  , prix_haut_simple : 455 } ,
  {name : "Cicogne", prix_bas_Double : 335  , prix_bas_simple : 265 , prix_haut_Double : 405  , prix_haut_simple : 335 } , ]
  Chambre_list : any
  HFormGroup1 : FormGroup
  HFormGroup2 : FormGroup

  constructor(
    private service : ReservationServiceService, 
    public dialogRef: MatDialogRef<ChambreAddFormDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder 
  ) {
    // Set the defaults
    // this.action = data.action;
    // if (this.action === 'edit') {
    //   this.dialogTitle = data.calendar.title;
    //   this.reservationChambre = data.reservationChambre;
    //   this.showDeleteBtn = true;
    // } else {
    //   this.dialogTitle = 'New Event';
    //   this.reservationChambre = new reservationChambre({});
    //   this.showDeleteBtn = false;
    // }
    this.reservationChambreForm = this.createContactForm();
  }


  ngOnInit() {
   this.getRoomList();
   this.createForms();
  }


  createForms(){
    this.HFormGroup1 = this.fb.group({
      taarifType: ['', Validators.required],
      roomType: ['', Validators.required],
    });
    this.HFormGroup2 = this.fb.group({
      roomID: [''],
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

  addNewReservation(){
    const reservation = {
      type : 'room' ,
      first_name : this.reservationChambreForm.get('first_name').value,
      last_name : this.reservationChambreForm.get('last_name').value,
      roomID : this.reservationChambreForm.get('roomID').value,
      requestDate : formatDate(new Date(), 'yyyy-MM-dd', 'en') ,
      startDate : formatDate(this.reservationChambreForm.get('startDate').value, 'yyyy-MM-dd', 'en') ,
      endDate : formatDate(this.reservationChambreForm.get('endDate').value, 'yyyy-MM-dd', 'en'),
      number_guests : this.reservationChambreForm.get('number_guests').value,
      number_children : this.reservationChambreForm.get('number_children').value,
      number_identity_document : this.randomKey,
      comment : this.reservationChambreForm.get('comment').value,
      extra : this.reservationChambreForm.get('extra').value,
      price : this.priceTotal
    }
    this.service.addReservation(reservation).subscribe((data : any) => {
      this.showNotification(
        'snackbar-success',
         data.message,
        'top',
        'end'
      );
      this.dialogRef.close();
    })
  }



  getRoomList(){
    this.service.getRoomList().subscribe((data : any) => {
        this.Chambre_list = data;
         
    })
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
    if (this.room){
      if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
        this.RoomPrice = this.room?.SINGLE_BAS_SAISON
      } 
      else if (this.roomType === 'single' && this.taarifType === 'haut de saison'){
        this.RoomPrice = this.room?.SINGLE_HAUTE_SAISON
      }
      else if (this.roomType === 'double' && this.taarifType === 'bas de saison'){
        this.RoomPrice = this.room?.DOUBLE_BAS_SAISON
      }
      else if (this.roomType === 'double' && this.taarifType === 'haut de saison'){
        this.RoomPrice = this.room?.DOUBLE_HAUTE_SAISON


      }
      this.calculTotal(this.Days , this.RoomPrice);
    }
  }

  showRoom(event : MatSelectChange){
    this.room = event.value

    if (this.roomType === 'single' && this.taarifType === 'bas de saison'){
        this.RoomPrice = this.room?.SINGLE_BAS_SAISON
      } 
    else if (this.roomType === 'single' && this.taarifType === 'haut de saison'){
        this.RoomPrice = this.room?.SINGLE_HAUTE_SAISON
      }
      else if (this.roomType === 'double' && this.taarifType === 'bas de saison'){
        this.RoomPrice = this.room?.DOUBLE_BAS_SAISON
      }
      else if (this.roomType === 'double' && this.taarifType === 'haut de saison'){
        this.RoomPrice = this.room?.DOUBLE_HAUTE_SAISON
      }
    this.calculTotal(this.Days , this.RoomPrice);
    
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
  checkDates(event : any ){
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

   calculTotal(days : any , roomPrice : any ){
        console.log("price", this.RoomPrice)
        this.priceTotal = roomPrice * days
        console.log("price", this.RoomPrice)
        this.reservationChambreForm.get('price').setValue(this.priceTotal);
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
      type : [ 'room' ],
      first_name : [ '' , Validators.required],
      last_name : ['' , Validators.required],
      roomID : ['' ],
      size : ['' , Validators.required],
      requestDate : [formatDate(new Date(), 'yyyy-MM-dd', 'en') ],
      startDate : ['' , Validators.required],
      endDate : ['' , Validators.required],
      number_guests : [2 ],
      number_identity_document : this.randomKey,
      comment : [''],
      remarque : [''],
      taarif : [''],
      extra : [''],
      price : [''],
    });
  }
  submit() {
    // emppty stuff
  }
  deleteEvent() {
    this.dialogRef.close('delete');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.dialogRef.close('submit');
  }
}
