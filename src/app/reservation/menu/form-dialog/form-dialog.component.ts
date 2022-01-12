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
import { map, startWith, take } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { formatDate } from '@angular/common';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';



@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
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
  MenuPrice1 = true;
  MenuPriceValue = 0;
  MenuPrice2 = false;

  PriceTotal = 0 ;
  entree : any;
  dessert : any;
  suite : any
  showMenuDetails = false
  sodaPrice = 0; 
  EauPrice = 0;
  pricePdjMenu = 0;

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


 // List des tarifs personaliser
  EntreeFeroidsList: any[] = [
   {name:'Salade tunisienne', price:12},
   {name:'Salade de capese', price:18},
   {name:'Salade méchouia', price:13},
   {name:'Salade niçoise', price:14},
   {name:'Salade César', price:18},
   {name:'Salade Dar ichkeul', price:14},
   {name:'Salade de saumon fumé', price:25},
  ];
  EntreeChaudesList: any[] = [
    {name:"Soupe à agneau", price:16},
    {name:'Brik au thion', price:6},
    {name:'Brik à la viande', price:7}   
  ]

  NosSpecialistesList: any[] = [
    {name:"Agneau à la gargoulette", price:35},
    {name:"Cotelette agneau grillée", price:32},
    {name:"Entrecote grillée beurre maitre hotel", price:40},
    {name:"Filet de boeuf", price:45},
    {name:"Grillades mixtes", price:39},
    {name:"Cailles grillées", price:28},
    {name:"Escalope de poulet à la crème", price:28},
    {name:"Excalope de poulet panné", price:25},
    {name:"Ojja Merguez", price:18},
    {name:"Ojja chevrettes", price:28}    
  ]

 PatesList: any[] = [
    {name:"Nwasser au poulet fermier", price:20},
    {name:"Spaghettis Bolognaises", price:32},
  ]

BoissonsList: any[] = [
    {name:"Eau minérale 1L", price:3},
    {name:"Eau gazeuse 1L", price:3},
    {name:"Soda", price:4},
    {name:"Jus Orange", price:6},
    {name:"Jus de Fraise", price:6},
    {name:"Citronade", price:4},
    {name:"Boissons énergétiques", price:8},
    {name:"Nepresso", price:4.5},
  ]

  DessertsList: any[] = [
    {name:"Sorbet", price:4},
    {name:"Assiette de fruits(1pax)", price:8},
    
  ]

 ///////////////////////////////
 //list of personalize tarifs variable 
 boissons:any;
 desserts:any;
 pates:any;
 specialists:any;
 chaudes:any;
 froides:any;
 totalePersoMenuPrice:any;

 totalTarifBoissons:any;
 totalTarifDesserts :any;
 totalTarifPates:any;
 totalTarifSpecialists:any;
 totalTarifChaudes:any;
 totalTarifFeroids :any;

  selectedd: string[] = ['Select all']
  searchuser!: any[];
  users!: any[];
  //showview = false;
  showview = true;
  roomName:any;
  isUnderline = true;
  listOfTarifNames:any;
  arrayBoisson:any;
  arrayDessert:any;
  arrayPate:any;
  arraySpeciale:any;
  arrayChaud:any;
  arrayFeroids:any;
  clientID:string;
  RepasStandardTypeList: any[] = [
    "petit déjeuner",
     "déjeuner"  
  ]
  RepasPersoTypeList: any[] = [
    "petit déjeuner",
    "déjeuner",
    "diner"
  ]

  soda = 0;
  eau = 0;
  ptDejPrice = 20;
  arrayOfeventValue=[];
  menuPdj = false;
  menuSta = false;

  addTwoMenu = false;
  addTwoMenu2 = false;
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

     /*if(this.user == undefined){
        this.user = '';
     }else{
        //this.showview = false;
     }

     if(this.roomName == undefined){
        this.roomName = '';
     }*/
    
   // this.getUserList();
    this.getMenus();
  }



/*
getUserList(){
  /*
  this.service.getUserList().subscribe((users:any[]) => {
    console.log('users>>>>',users);
    //this.users = users;
    this.searchuser = this.users = users;
})

this.service.getReservationList().pipe(take(1)).subscribe((users:any[]) => {
  console.log('users>>>>',users);
  this.users = users;
  this.searchuser = this.users = users;
})


}*/

  /*
search(query:string)
  {
    console.log('query>>>',query);
    if(query == ''){
      // this.showview = true
    }
     this.searchuser = (query) ? this.users.filter( users =>
       users.clientID.first_name.toLowerCase().includes(query.toLowerCase()) ||
       users.clientID.last_name.toLowerCase().includes(query.toLowerCase()) 
       ) 
       : this.users;
  }*/
  
/*
selected(event: MatAutocompleteSelectedEvent): void {
    console.log('event selected>>>',event.option.value);
     
      this.user = event.option.value.clientID.first_name;
      this.clientID = event.option.value.clientID._id;
      
      //if(this.user != undefined){
       // this.showview = false
     // }
      this.roomName = event.option.value.roomID.name;
      console.log('roomName>>>',this.roomName);
      
     
  }*/

/*
displayFn(subject:any)
  {
     return subject ? subject.clientID.first_name : undefined;
  }
  */

getMenus(){
    this.service.getMenuList().pipe(take(1)).subscribe((data : any)=>{
      console.log('menus from get menus>>>',data);
      
     this.Menus = data.reverse();
    })
  }

/*getRooms(){
    this.service.getRoomList().subscribe((data : any)=>{
     // this.Chambres = data ;
    })
}*/


changePersoView(){
  this.showview = false
  this.isUnderline = false;
  console.log('showview',this.showview);
  
}

changeStandardView(){
  this.showview = true
  this.isUnderline = true;
  console.log('showview',this.showview);
  
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
  

showMenuStandard(event:MatSelectChange){
  console.log('menu standard value>>>', event.value);

  if(event.value === 'petit déjeuner'){
    this.MenuPrice2 = true;
    this.MenuPrice1 = false;
    this.menuPdj = true;
    this.menuSta = false;
    
  //  let price = this.reservationMenuForm.get('number_guests').value * 20;
  //  this.MenuPriceValue = price;
    console.log('menuPrice2>>>', this.MenuPrice2);
    this.PriceTotal =  this.reservationMenuForm.get('number_guests').value * this.ptDejPrice 
  }
  
}

showMenuPerso(event:MatSelectChange){

}



showMenu(event : MatSelectChange){
    this.entree = event.value.entree;
    this.dessert = event.value.dessert;
    this.suite = event.value.suite;
    this.showMenuDetails = true ; 
    this.menuPdj = false;
    this.menuSta = true;
  
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
  console.log('price totale from calcule >>>', menuPrice);
  console.log('nombre totale from calcule >>>', nombre_personnes );
  this.reservationMenuForm.get('price').setValue(this.PriceTotal);
 }


 re_calculTotal(event: any){
   console.log('event.target.value>>>',event.target.value );
   if(this.menuSta){
      this.calculTotal(event.target.value  , this.MenuPrice);
   }else{
      this.calculTotal(event.target.value  , this.ptDejPrice);
   }


 }
 
 addToTotal(type :any){
   if (this.PriceTotal){
     if(type === "Soda") {
       this.sodaPrice = this.sodaPrice + 2
       this.PriceTotal = this.PriceTotal + 2
       this.soda = this.soda + 1;
       console.log('soda>>>', this.soda);
       
     }
     else if (type === "Eau") {
      this.EauPrice = this.EauPrice + 1
      this.PriceTotal = this.PriceTotal + 1
      this.eau = this.eau + 1 ;
    }
   }
 }


 removeFromTotal(type :any){
  if (this.PriceTotal){
    if(type === "Soda") {
      this.PriceTotal = this.PriceTotal - 2
      this.sodaPrice = this.sodaPrice - 2
      this.soda = this.soda - 1;
    }
    else if (type === "Eau") {
     this.PriceTotal = this.PriceTotal - 1
     this.EauPrice = this.EauPrice - 1;
     this.eau = this.eau - 1 ;
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
      number_phone:['',Validators.required],
      number_heure:['',Validators.required],
      entreSta:['déjeuner'],
      entrePerso:['déjeuner'],
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
      status : ['COMMANDE'],
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


//calcul all perso tarifs
calculTarifPersoMenu(event : MatSelectChange){
 
  //////
  if(event.source.ngControl.name == 'boissons'){
    
    this.boissons = event.value;
    const names = event.value.map(v => {
         return v.name;
      });
   
     this.arrayBoisson = names;
    // this.listOfTarifNames = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || "")); 
        let filterList = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
            this.listOfTarifNames = filterList.filter(function(e){return e});



          const totalTarifBoissons = this.boissons.reduce((acc,cur) => {
          return acc + cur.price;
        },0)
    
    this.totalTarifBoissons = totalTarifBoissons;
    this.totalePersoMenuPrice = this.totalTarifBoissons + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
   console.log('totale persomenu boissons',this.listOfTarifNames);
   
  }

//////////
if(event.source.ngControl.name == 'desserts'){
  this.desserts = event.value;
  ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayDessert= names;
 //this.listOfTarifNames = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 let filterList =  this.arrayDessert.concat((this.arrayBoisson || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 this.listOfTarifNames = filterList.filter(function(e){return e});
///
    const totalTarifDesserts = this.desserts.reduce((acc,cur) => {
    return acc + cur.price;
     },0)
  
   this.totalTarifDesserts = totalTarifDesserts;
   this.totalePersoMenuPrice = this.totalTarifDesserts + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
   console.log('totale persomenu dessert',this.listOfTarifNames);
}


///////////
if(event.source.ngControl.name == 'pates'){
    this.pates = event.value;

   ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayPate= names;
 //this.listOfTarifNames = this.arrayPate.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 let filterList = this.arrayPate.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 this.listOfTarifNames = filterList.filter(function(e){return e});


   const totalTarifPates = this.pates.reduce((acc,cur) => {
   return acc + cur.price;
  },0)
 console.log('tarif pates price >>>', totalTarifPates);
 this.totalTarifPates = totalTarifPates;
 this.totalePersoMenuPrice =  this.totalTarifPates + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
 console.log('totale persomenu pates',this.listOfTarifNames);

}

///////
if(event.source.ngControl.name == 'nos_specialite'){
     this.specialists = event.value;
     ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arraySpeciale= names;
 //this.listOfTarifNames = this.arraySpeciale.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arrayPate || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 let filterList = this.arraySpeciale.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arrayPate || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))

 this.listOfTarifNames = filterList.filter(function(e){return e});


     const totalTarifSpecialists = this.specialists.reduce((acc,cur) => {
     return acc + cur.price;
  },0)
  console.log('tarif specialiste price >>>', totalTarifSpecialists);
  this.totalTarifSpecialists = totalTarifSpecialists;
  this.totalePersoMenuPrice =  this.totalTarifSpecialists + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
  console.log('totale persomenu specialiste',this.listOfTarifNames);

}

 ///////
 if(event.source.ngControl.name == 'entree_chaudes'){
   this.chaudes = event.value;

    ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayChaud= names;
// this.listOfTarifNames = this.arrayChaud.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayBoisson || ""),(this.arrayFeroids || ""))
 let filterList = this.arrayChaud.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""),(this.arrayFeroids || ""),(this.arrayPate || ""))

 this.listOfTarifNames = filterList.filter(function(e){return e});


    const totalTarifChaudes = this.chaudes.reduce((acc,cur) => {
    return acc + cur.price;
   },0)
   console.log('tarif chaudes price >>>', totalTarifChaudes);
   this.totalTarifChaudes = totalTarifChaudes;
   this.totalePersoMenuPrice =  this.totalTarifChaudes + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
   console.log('totale persomenu chaud',this.listOfTarifNames);
  }
 
/////
if(event.source.ngControl.name == 'entree_froides'){
  this.froides = event.value;
  ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayFeroids= names;
 //this.listOfTarifNames = this.arrayFeroids.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayPate || ""))
 let filterList = this.arrayFeroids.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayPate || ""))

 this.listOfTarifNames = filterList.filter(function(e){return e});


  const totalTarifFeroids = this.froides.reduce((acc,cur) => {
  return acc + cur.price;
  },0)
  console.log('tarif feroids price >>>', totalTarifFeroids);
   this.totalTarifFeroids = totalTarifFeroids;
   this.totalePersoMenuPrice = this.totalTarifFeroids + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);

   console.log('totale persomenu froids',this.listOfTarifNames);
  }


}



  confirmAdd(): void {
    
    console.log('entre perso>>>',this.reservationMenuForm.get('entrePerso').value);
 
  if(this.menuPdj){
        console.log('clientid>>>>', this.clientID);
        
    const reservationPersoForm  = {
      type : 'menu',
      status : this.reservationMenuForm.get('status').value,
      comment : this.reservationMenuForm.get('comment').value,
      price : this.PriceTotal,
      number_guests : this.reservationMenuForm.get('number_guests').value,
      startDate  : formatDate(this.reservationMenuForm.get('startDate').value, 'yyyy-MM-dd', 'en') ,
      first_name : this.reservationMenuForm.get('first_name').value,
      last_name : this.reservationMenuForm.get('last_name').value,
      number_phone : this.reservationMenuForm.get('number_phone').value,
      menuID : '61dc2a61f84f650b20574076',
      number_heure: this.reservationMenuForm.get('number_heure').value,
      entreSta:this.reservationMenuForm.get('entreSta').value,
      nb_eau : this.eau,
      nb_soda: this.soda
     
     }
     
     console.log('reservationForm>>>', reservationPersoForm);
     
     this.service.addMenuReservation(reservationPersoForm).subscribe((data : any) => {
       console.log('new perso reservation',data)
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



  }else{

    console.log('typede repas>>>', this.reservationMenuForm.get('menuID').value);
    
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
      number_heure: this.reservationMenuForm.get('number_heure').value,
      entreSta:this.reservationMenuForm.get('entreSta').value,
      nb_eau : this.eau,
      nb_soda: this.soda
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
