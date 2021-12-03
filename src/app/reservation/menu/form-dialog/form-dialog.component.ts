import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { reservationMenu } from '../menu.model';

import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.sass']
})
export class FormDialogComponent implements OnInit {
  action: string;
  today = new Date();
  randomKey = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  dialogTitle: string;
  reservationMenuForm: FormGroup;
  reservationMenu: reservationMenu;
  Menus : any;
  Chambres : any = []
  MenuPrice = 0;
  PriceTotal = 0 ;
  entree : any;
  dessert : any;
  suite : any
  showMenuDetails = false
  sodaPrice = 0; 
  EauPrice = 0;


  constructor(
    private service : ReservationServiceService,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private fb: FormBuilder, 
    private snackBar : MatSnackBar,
  ) {
    // Set the defaults
    this.reservationMenuForm = this.createContactForm();
  }

  ngOnInit() {
    this.getRooms()
    this.getMenus();
  }


  getMenus(){
    this.service.getMenuList().subscribe((data : any)=>{
      
     this.Menus = data
    })
  }

  getRooms(){
    this.service.getRoomList().subscribe((data : any)=>{
      this.Chambres = data ;
    })
  }



  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
        : '';
  }
  


  showMenu(event : MatSelectChange){
    this.entree = event.value.entrée;
    this.dessert = event.value.dessert;
    this.suite = event.value.suite;
    this.showMenuDetails = true ; 
    if (event.value.price){
      this.MenuPrice = event.value.price
    }
    this.reservationMenuForm.get('menuID').setValue(event.value._id) 
    this.calculTotal(this.reservationMenuForm.get('number_guests').value  , this.MenuPrice );
    
  }

  resetChambre(event : MatSelectChange){
    if (event.value = "null") {
      this.reservationMenuForm.get('roomID').reset; 
    }

  }

 calculTotal(nombre_personnes : any , menuPrice : any ){
  this.PriceTotal = (menuPrice * nombre_personnes) 
  this.reservationMenuForm.get('price').setValue(this.PriceTotal);
 }


 re_calculTotal(event: any){
 this.calculTotal(event.target.value  , this.MenuPrice );
 }
 
 addToTotal(type :any){
   if (this.PriceTotal){
     if(type === "Soda") {
       this.sodaPrice = this.sodaPrice + 2
       this.PriceTotal = this.PriceTotal + 2
     }
     else if (type === "Eau") {
      this.EauPrice = this.EauPrice + 1
      this.PriceTotal = this.PriceTotal + 1
    }
   }
 }
 removeFromTotal(type :any){
  if (this.PriceTotal){
    if(type === "Soda") {
      this.PriceTotal = this.PriceTotal - 2
      this.sodaPrice = this.sodaPrice - 2
      
    }
    else if (type === "Eau") {
     this.PriceTotal = this.PriceTotal - 1
     this.EauPrice = this.EauPrice - 1
   }
  }
}




  createContactForm(): FormGroup {
    return this.fb.group({
      type : [ 'menu' ],
      first_name : [ '' , Validators.required],
      last_name : ['' , Validators.required],
      roomID : [''],
      menuID : [''],
      startDate : ['' , Validators.required],
      number_guests : [1,Validators.required],
      number_identity_document : this.randomKey,
      comment : [''],
      status : [''],
      extra : [''],
      price : [''],
    });
  }
  
  showRoom(event : MatSelectChange){
    console.log(event.value)
   
    this.reservationMenuForm.get('roomID').setValue(event.value) 
    console.log(this.reservationMenuForm.get('roomID').value )
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmAdd(): void {
    this.reservationMenuForm.get('roomID').value
   const reservationForm  = {
    tarif : 'SINGLE_BAS_SAISON_PRICE' ,
    type : 'menu',
    status : this.reservationMenuForm.get('status').value,
    extra : this.reservationMenuForm.get('extra').value,
    comment : this.reservationMenuForm.get('comment').value,
    price : this.PriceTotal,
    number_guests : this.reservationMenuForm.get('number_guests').value,
    menuID : this.reservationMenuForm.get('menuID').value,
    roomID : this.reservationMenuForm.get('roomID').value,
    startDate : this.reservationMenuForm.get('startDate').value,
    endDate : this.reservationMenuForm.get('startDate').value,
    number_identity_document : this.reservationMenuForm.get('number_identity_document').value,
    first_name : this.reservationMenuForm.get('first_name').value,
    last_name : this.reservationMenuForm.get('last_name').value,
   }
   
   this.service.addReservation(reservationForm).subscribe((data : any) => {
     console.log(data)
    // this.showNotification(
    //   'snackbar-success',
    //    data.message,
    //   'top',
    //   'end'
    // );
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
