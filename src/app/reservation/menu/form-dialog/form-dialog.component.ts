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


import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { formatDate } from '@angular/common';



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
  //Chambres : any = []
  MenuPrice = 0;
  PriceTotal = 0 ;
  entree : any;
  dessert : any;
  suite : any
  showMenuDetails = false
  sodaPrice = 0; 
  EauPrice = 0;
  options: string[] = ['Angular', 'React','Vue']
  objectOptions = [
    {name: 'Angular'},
    {name: 'React'},
    {name: 'Vue'}
  ]

  user:any;
  myControl = new FormControl();
  filterdOptions: Observable<string[]>;

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

/*
  Menus = [
    {
          dessert: "Assiette de fruits de saison",
          entrée: "Trio de salade",
          name: "Menu 1",
          price: 150,
          suite: "Agneau à la gargoulette",
          tarif: "simple",
          _id: "615de00b5f8924312bf7b297",
    },
    {
      dessert: "Assiette de fruits de saison",
      entrée: "Trio de salade",
      name: "Menu 2",
      price: 80,
      suite: "grillade mixte",
      tarif: "simple",
      _id: "615de0b75f8924312bf7b298"
    },
    {
      dessert: "Assiette de fruits de saison",
      entrée: "Trio de salade",
      name: "Menu 3",
      price: 90,
      suite: "Poisson grillé",
      tarif: "simple",
      _id: "615de0f55f8924312bf7b299"
    },
    {
      dessert: "Assiette de fruits de saison",
      entrée: "Trio de salade",
      name: "Menu 4",
      price: 120,
      suite: "couscous à l'agneau",
      tarif: "simple",
      _id: "615de1365f8924312bf7b29a"
    },
    
  ]*/

 // toppings = new FormControl();
  EntreeFeroidsList: any[] = [{name:'Salade tunisienne', price:12},
                              {name:'Salade de capese', price:18},
                              {name:'Salade méchouia', price:13},
                              {name:'Salade niçoise', price:14},
                              {name:'Salade César', price:18},
                              {name:'Salade Dar ichkeul', price:14},
                              {name:'Salade de saumon fumé', price:25},
                            ];
  selectedd: string[] = ['Select all']
  searchuser!: any[];
  users!: any[];
  showview = false;
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

     console.log('topping>>>',this.selectedd);
     


     if(this.user == undefined){
       this.user = '';
       this.showview = true
     }else{
       this.showview = false;
     }
    
     this.service.getUserList().subscribe((users:any[]) => {
      console.log('users>>>>',users);
      //this.users = users;
      this.searchuser = this.users = users;
  })
    this.getRooms()
    this.getMenus();
  }



  
  search(query:string)
  {
    console.log('query>>>',query);
    if(query == ''){
      this.showview = true
    }
     this.searchuser = (query) ? this.users.filter( players =>
       players.first_name.toLowerCase().includes(query.toLowerCase()) ||
       players.last_name.toLowerCase().includes(query.toLowerCase()) 
       ) 
       : this.users;
  }
  


  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('event selected>>>',event.option.value);

      this.user = event.option.value.first_name;
      if(this.user != undefined){
        this.showview = false
      }
     
  }

  ////////

  displayFn(subject:any)
  {
     return subject ? subject.first_name : undefined;
  }
  


  /////////////

  getMenus(){
    this.service.getMenuList().subscribe((data : any)=>{
      
     this.Menus = data
    })
  }

getRooms(){
    this.service.getRoomList().subscribe((data : any)=>{
     // this.Chambres = data ;
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
    console.log('this user from form>>>',this.user);
    
    return this.fb.group({
      type : [ 'menu' ],
      first_name : ['' , Validators.required],
      last_name : ['' , Validators.required],
      first:['' , Validators.required],
      number_phone:['' , Validators.required],
      number_heure:['' , Validators.required],
      roomName:[],
      entree_froides:[],
      entree_chaudes:[],
      nos_specialite:[],
      boissons:[],
      pates:[],
      desserts:[],
      roomID : [''],
      menuID : [''],
      startDate : ['' , Validators.required],
      number_guests : [1,Validators.required],
      client_ID : ['',Validators.required],
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
    console.log('toppings>>>',this.reservationMenuForm);
    
    this.reservationMenuForm.get('roomID').value
   const reservationForm  = {
    type : 'menu',
    status : this.reservationMenuForm.get('status').value,
    comment : this.reservationMenuForm.get('comment').value,
    price : this.PriceTotal,
    number_guests : this.reservationMenuForm.get('number_guests').value,
    startDate  : formatDate(this.reservationMenuForm.get('startDate').value, 'yyyy-MM-dd', 'en') ,
    first_name : this.reservationMenuForm.get('first_name').value,
    last_name : this.reservationMenuForm.get('last_name').value,
    number_phone : this.reservationMenuForm.get('number_phone').value,
    menuID : this.reservationMenuForm.get('menuID').value,
    number_heure: this.reservationMenuForm.get('number_heure').value
   }
   
   console.log('reservationForm>>>', reservationForm);
   
   this.service.addMenuReservation(reservationForm).subscribe((data : any) => {
     console.log(data)
     this.showNotification(
         'snackbar-success',
          data.message,
         'top',
         'end'
       );  
  },err => {
    console.log('err>>>',err);
    this.showNotification(
     'snackbar-danger',
      err,
     'top',
     'end'
   );
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
