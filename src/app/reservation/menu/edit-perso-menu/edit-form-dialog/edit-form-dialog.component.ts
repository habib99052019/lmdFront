import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import Swal from 'sweetalert2';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-form-dialog',
  templateUrl: './edit-form-dialog.component.html',
  styleUrls: ['./edit-form-dialog.component.scss']
})
export class EditFormDialogComponent implements OnInit {




 globalLisMenus:any[] = [
  {name:"Sorbet", price:4},
  {name:"Assiette de fruits(1pax)", price:8},
  {name:"Eau minérale 1L", price:3},
   {name:"Eau gazeuse 1L", price:3},
   {name:"Soda", price:4},
   {name:"Jus Orange", price:6},
   {name:"Jus de Fraise", price:6},
   {name:"Citronade", price:4},
   {name:"Boissons énergétiques", price:8},
   {name:"Nepresso", price:4.5},
   {name:"Nwasser au poulet fermier", price:20},
   {name:"Spaghettis Bolognaises", price:32},
   {name:"Agneau à la gargoulette", price:35},
   {name:"Cotelette d'agneau grillée", price:32},
   {name:"Entrecote grillée beurre maitre d'hotel", price:40},
   {name:"Filet de boeuf", price:45},
   {name:"Grillades mixtes", price:39},
   {name:"Cailles grillées", price:28},
   {name:"Escalope de poulet à la crème", price:28},
   {name:"Excalope de poulet panné", price:25},
   {name:"Ojja Merguez", price:18},
   {name:"Ojja chevrettes", price:28},
   {name:"Soupe à agneau", price:16},
   {name:'Brik au thion', price:6},
   {name:'Brik à la viande', price:7},
   {name:'Salade tunisienne', price:12},
  {name:'Salade de capese', price:18},
  {name:'Salade méchouia', price:13},
  {name:'Salade niçoise', price:14},
  {name:'Salade César', price:18},
  {name:'Salade Dar ichkeul', price:14},
  {name:'Salade de saumon fumé', price:25},  
 ]


 StaticListTarifNames: any[] = [
   "Sorbet",
   "Assiette de fruits(1pax)",
   "Eau minérale 1L",
   "Eau gazeuse 1L",
   "Soda",
   "Jus Orange",
   "Jus de Fraise",
   "Citronade",
   "Boissons énergétiques",
   "Nepresso",
   "Nwasser au poulet fermier",
   "Spaghettis Bolognaises",
   "Agneau à la gargoulette",
   "Cotelette d'agneau grillée",
   "Entrecote grillée beurre maitre d'hotel",
   "Filet de boeuf",
   "Grillades mixtes",
   "Cailles grillées",
   "Escalope de poulet à la crème",
   "Excalope de poulet panné",
   "Ojja Merguez",
   "Ojja chevrettes",
   "Soupe à agneau",
   "Brik au thion",
   'Brik à la viande',
   'Salade tunisienne',
    'Salade de capese',
    'Salade méchouia',
    'Salade niçoise',
    'Salade César',
    'Salade Dar ichkeul',
    'Salade de saumon fumé',  
 ]
///////////////////////////////
RepasStandardTypeList: any[] = [
  "petit déjeuner",
   "déjeuner"  
]
RepasPersoTypeList: any[] = [
  "petit déjeuner",
  "déjeuner",
  "diner"
]

selectedValue: string[] = ['Sorbet']

listOfTarifNames1:any;
searchuser!: any[];

first_name:any;
last_name:any;
roomName:any;
repasType:any;
comment:any;
price:any;
user:any;
froidsMenuList:any;
chaudsMenuList:any;
specialistMenuList:any;
BoissonMenuList:any;
DessertMenuList:any;
PatsMenuList:any;
boissons=[{name:'', price:0}];
desserts=[{name:'',price:0}];
pates=[{name:'',price:0}];
arrayBoisson:any = [];
arrayDessert:any = [];
arrayPate:any = [];
arraySpeciale:any = [];
arrayChaud:any = [];
arrayFeroids :any = [];
totalTarifBoissons:any;
totalePersoMenuPrice1:any;
totalTarifDesserts:any;
totalTarifPates:any;
totalTarifSpecialists :any;
totalTarifChaudes:any;
totalTarifFeroids:any;
listBoissons:any;
listDesserts:any;
listPates:any;
remise:any;
globalMenu  = [{name:'', price:0}];
arrayglobalMenu:any;
totalTarifGlobal:any;
globalOfListTarifNames:any;
showMenuDetails = true;
panelOpenState = false;


///////////Update solution //////////


 
 // List des tarifs personaliser
 /*
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
   {name:"Soupe à l'agneau", price:16},
   {name:'Brik au thion', price:6},
   {name:'Brik à la viande', price:7}   
 ]

 NosSpecialistesList: any[] = [
   {name:"Agneau à la gargoulette", price:35},
   {name:"Cotelette d'agneau grillée", price:32},
   {name:"Entrecote grillée beurre maitre d'hotel", price:40},
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
   
 ]*/

 specialists:any;
 chaudes:any;
 froides:any;
 listOfTarifNames2:any;
 listOfStaticRarifNames:any;
 totalePersoMenuPrice2:any;
 reservationMenuForm: FormGroup;
 showNew = false;
 menuID:any;
 number_heure:any;
/////////////////////

//////////Menu2////////////
showview = true;
isUnderline = true;
/*
EntreeFeroidsList2: any[] = [
  {name:'Salade tunisienne', price:12},
  {name:'Salade de capese', price:18},
  {name:'Salade méchouia', price:13},
  {name:'Salade niçoise', price:14},
  {name:'Salade César', price:18},
  {name:'Salade Dar ichkeul', price:14},
  {name:'Salade de saumon fumé', price:25},
 ];
 EntreeChaudesList2: any[] = [
   {name:"Soupe à l'agneau", price:16},
   {name:'Brik au thion', price:6},
   {name:'Brik à la viande', price:7}   
 ]

 NosSpecialistesList2: any[] = [
   {name:"Agneau à la gargoulette", price:35},
   {name:"Cotelette d'agneau grillée", price:32},
   {name:"Entrecote grillée beurre maitre d'hotel", price:40},
   {name:"Filet de boeuf", price:45},
   {name:"Grillades mixtes", price:39},
   {name:"Cailles grillées", price:28},
   {name:"Escalope de poulet à la crème", price:28},
   {name:"Excalope de poulet panné", price:25},
   {name:"Ojja Merguez", price:18},
   {name:"Ojja chevrettes", price:28}    
 ]

PatesList2: any[] = [
   {name:"Nwasser au poulet fermier", price:20},
   {name:"Spaghettis Bolognaises", price:32},
 ]

BoissonsList2: any[] = [
   {name:"Eau minérale 1L", price:3},
   {name:"Eau gazeuse 1L", price:3},
   {name:"Soda", price:4},
   {name:"Jus Orange", price:6},
   {name:"Jus de Fraise", price:6},
   {name:"Citronade", price:4},
   {name:"Boissons énergétiques", price:8},
   {name:"Nepresso", price:4.5},
 ]

 DessertsList2: any[] = [
   {name:"Sorbet", price:4},
   {name:"Assiette de fruits(1pax)", price:8},
   
 ]*/

 boissons2:any;
 specialists2:any;
 chaudes2:any;
 froides2:any;
 desserts2:any;
 pates2:any;
 arrayBoisson2:any = [];
arrayDessert2:any = [];
arrayPate2:any = [];
arraySpeciale2:any = [];
arrayChaud2:any = [];
arrayFeroids2:any = [];

totalTarifBoissons2:any;
totalTarifDesserts2:any;
totalTarifPates2:any;
totalTarifSpecialists2:any;
totalTarifChaudes2:any;
totalTarifFeroids2:any;

totalePersoMenu2Price:any
listOfTarifMenu2Names:any
chaudsMenuList2:any;
globalMenu2  = [{name:'', price:0}];
arrayglobalMenu2:any;
listOfOldTarifMenu2Names:any;
totalTarifGlobal2:any;
ListStaticOfNamesmenu2:any

repasType2:any;
comment2:any;
price2:any; 
menu2List:any;
menuID2:any;
ListOfNamesmenu2:any
listDynamiqueMenu2:any;
number_heure2:any;
remise2:any;
////////////////////

menu1=1;

/////////////////

DessertsList: any[];
BoissonsList: any[];
PatesList:any[];
NosSpecialistesList:any[];
EntreeChaudesList:any[];
EntreeFeroidsList:any[];

DessertsList2: any[];
BoissonsList2: any[];
PatesList2:any[];
NosSpecialistesList2:any[];
EntreeChaudesList2:any[];
EntreeFeroidsList2:any[];

////////////////


  constructor( public dialogRef: MatDialogRef<EditFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private service : ReservationServiceService ,
    private snackBar : MatSnackBar,) { 
      this.reservationMenuForm = this.createContactForm();
    }

  ngOnInit(): void {

   
    
    this.first_name = this.data['first_name'];
    this.user = this.data['first_name'];
    this.roomName = this.data['roomName'];
    this.repasType = this.data['repasType'];
    this.comment = this.data['comment'];
    this.price = this.data['price'];
    this.listOfTarifNames2 = this.data['menuList'];
    this.listOfStaticRarifNames = this.data['menuList'];
    this.menuID = this.data['menuID'];
    this.number_heure = this.data['number_heure'];
    this.remise = this.data['remise']

    this.ListStaticOfNamesmenu2 = this.data['menu2List'];
    this.listDynamiqueMenu2 = this.data['menu2List'];
   
    
    this.price2 = this.data['price2'];
    this.repasType2 = this.data['repasType2'];
    this.comment2 = this.data['comment2'];
    this.number_heure2 = this.data['number_heure2'];
    this.remise2 = this.data['remise2']
 

   this.getPlatList();
    
    
   
  }



  createContactForm(): FormGroup {
   
    
    return this.fb.group({
      type : [ 'menu' ],
      first_name : ['' , Validators.required],
      last_name : ['' , Validators.required],
      first:['' , Validators.required],
      number_phone:['',Validators.required],
      number_heure:['',Validators.required],
      entreSta:[''],
      entrePerso:[''],
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
      status : [''],
      extra : [''],
      price : [''],
    });
  
  }



  getPlatList(){
    this.service.getPlatListByCategory().pipe(take(1)).subscribe((plats:any[]) => {
          
          this.DessertsList = plats[0];
          this.DessertsList2 = plats[0];
          this.BoissonsList = plats[1];
          this.BoissonsList2 = plats[1];
          this.PatesList = plats[2];
          this.PatesList2 = plats[2];
          this.NosSpecialistesList = plats[3];
          this.NosSpecialistesList2 = plats[3];
          this.EntreeChaudesList = plats[4];
          this.EntreeChaudesList2 = plats[4];
          this.EntreeFeroidsList = plats[5];
          this.EntreeFeroidsList2 = plats[5];
  
          
    })
  }







 initLitsMenuPrice(){
  this.chaudsMenuList.forEach(item => {
 
    
    const resultat = this.globalLisMenus.find( menu => {
      if(menu.name === item){
        if(this.globalMenu.includes(menu)){
            this.globalMenu.splice(menu)
           
        
            
        }
        this.globalMenu.push(menu)
      
      }

    })
      
  })

   this.arrayglobalMenu = this.chaudsMenuList;
      let filterList = this.arrayglobalMenu.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""),(this.arrayBoisson || ""));
          this.listOfTarifNames1 = filterList.filter(function(e){return e});
           
        const totalTarifglobal = this.globalMenu.reduce((acc,cur) => {
        return acc + cur.price;
      },0)
  
  this.totalTarifGlobal = totalTarifglobal;
  this.totalePersoMenuPrice1 = this.totalTarifGlobal + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);

 }
  



 initLitsMenu2Price(){
  this.chaudsMenuList2.forEach(item => {

    
    const resultat = this.globalLisMenus.find( menu => {
      if(menu.name === item){
        if(this.globalMenu2.includes(menu)){
            this.globalMenu2.splice(menu)
           
            
            
        }
        this.globalMenu2.push(menu)
       
      }

    })
      
  })

   this.arrayglobalMenu2 = this.chaudsMenuList2;
      let filterList = this.arrayglobalMenu.concat((this.arrayDessert2 || ""),(this.arrayPate2 || ""), (this.arraySpeciale2 || ""), (this.arrayChaud2 || ""),(this.arrayFeroids2 || ""),(this.arrayBoisson2 || ""));
          this.listOfOldTarifMenu2Names = filterList.filter(function(e){return e});
           
        const totalTarifglobal = this.globalMenu2.reduce((acc,cur) => {
        return acc + cur.price;
      },0)
  
  this.totalTarifGlobal2 = totalTarifglobal;
  this.totalePersoMenuPrice1 = this.totalTarifGlobal + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);

 }
  


 countchange(event,menu){
   
  let precount = menu.count
  menu.count = event
let price
  switch (menu.from) {
    case 'boissons':
        price = this.boissons.find(x=>{
        return x.name == menu.name
      })
      
      this.totalTarifBoissons = (this.totalTarifBoissons - (price.price * precount)  ) +(price.price * menu.count) ;
      this.totalePersoMenuPrice2 = this.totalTarifBoissons + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
     this.data['price'] = this.totalePersoMenuPrice2;
     this.data['remise'] = this.totalePersoMenuPrice2;
     
      this.data['menuList'] = this.listOfTarifNames2;
      this.data['menuListTosent'] = this.listOfTarifNames2
     //  menu.price = price.price * menu.count
      break;

      case 'desserts':
          price = this.desserts.find(x=>{
          return x.name == menu.name
        })
        
        this.totalTarifDesserts = (this.totalTarifDesserts  - (price.price * precount)  ) +(price.price * menu.count) ;
       
        this.totalePersoMenuPrice2 =  this.totalTarifDesserts + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
        this.data['price'] = this.totalePersoMenuPrice2;
        this.data['remise'] = this.totalePersoMenuPrice2;
        
         this.data['menuList'] = this.listOfTarifNames2;
         this.data['menuListTosent'] = this.listOfTarifNames2
      //  menu.price = price.price * menu.count
        break;

        case 'pates':
          price = this.pates.find(x=>{
          return x.name == menu.name
        })
     
        this.totalTarifPates = (this.totalTarifPates  - (price.price * precount)  ) +(price.price * menu.count) ;
      

        this.totalePersoMenuPrice2 =  this.totalTarifPates + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
        this.data['price'] = this.totalePersoMenuPrice2;
        this.data['remise'] = this.totalePersoMenuPrice2;
        
         this.data['menuList'] = this.listOfTarifNames2;
         this.data['menuListTosent'] = this.listOfTarifNames2
        break;
        
        case 'nos_specialite':
          price = this.specialists.find(x=>{
          return x.name == menu.name
        })
      
        this.totalTarifSpecialists = (this.totalTarifSpecialists  - (price.price * precount)  ) +(price.price * menu.count) ;
       

        this.totalePersoMenuPrice2 =   this.totalTarifSpecialists  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
        this.data['price'] = this.totalePersoMenuPrice2;
        this.data['remise'] = this.totalePersoMenuPrice2;
        
        this.data['menuList'] = this.listOfTarifNames2;
        this.data['menuListTosent'] = this.listOfTarifNames2
        break;

        case 'entree_chaudes':
          price = this.chaudes.find(x=>{
          return x.name == menu.name
        })
        
        this.totalTarifChaudes = (this.totalTarifChaudes  - (price.price * precount)  ) +(price.price * menu.count) ;
       
        this.totalePersoMenuPrice2 =  this.totalTarifChaudes  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
        this.data['price'] = this.totalePersoMenuPrice2;
        this.data['remise'] = this.totalePersoMenuPrice2;
        
         this.data['menuList'] = this.listOfTarifNames2;
         this.data['menuListTosent'] = this.listOfTarifNames2

        break;

        case 'entree_froides':
          price = this.froides.find(x=>{
          return x.name == menu.name
        })
       
        this.totalTarifFeroids = (this.totalTarifFeroids - (price.price * precount)  ) +(price.price * menu.count) ;
        this.totalePersoMenuPrice2 =  this.totalTarifFeroids  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);
        this.data['price'] = this.totalePersoMenuPrice2;
        this.data['remise'] = this.totalePersoMenuPrice2;
        
         this.data['menuList'] = this.listOfTarifNames2;
         this.data['menuListTosent'] = this.listOfTarifNames2
        break;


    default:
      break;
  }
   
    

 
  
}


countchange2(event,menu){
  let precount = menu.count
  menu.count = event
let price
  switch (menu.from) {
    case 'boissons':
        price = this.boissons2.find(x=>{
        return x.name == menu.name
      })
     
      this.totalTarifBoissons2 = (this.totalTarifBoissons2 - (price.price * precount)  ) + (price.price * menu.count) ;
      this.totalePersoMenu2Price = this.totalTarifBoissons2 + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
   
      this.data['price2'] = this.totalePersoMenu2Price;
      this.data['remise2'] = this.totalePersoMenu2Price;
      
      this.data['menu2List'] = this.listDynamiqueMenu2;



      break;

      case 'desserts':
          price = this.desserts2.find(x=>{
          return x.name == menu.name
        })
       
        this.totalTarifDesserts2 = (this.totalTarifDesserts2  - (price.price * precount)  ) + (price.price * menu.count) ;
       
        this.totalePersoMenu2Price = this.totalTarifDesserts2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
        this.data['price2'] = this.totalePersoMenu2Price;
        this.data['remise2'] = this.totalePersoMenu2Price;
        
         this.data['menu2List'] = this.listDynamiqueMenu2;
        break;

        case 'pates':
          price = this.pates2.find(x=>{
          return x.name == menu.name
        })
       
        this.totalTarifPates2 = ( this.totalTarifPates2  - (price.price * precount)  ) + (price.price * menu.count) ;
      

        this.totalePersoMenu2Price = this.totalTarifPates2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
        this.data['price2'] = this.totalePersoMenu2Price;
        this.data['remise2'] = this.totalePersoMenu2Price;
        
          this.data['menu2List'] = this.listDynamiqueMenu2;
        break;
        
        case 'nos_specialite':
          price = this.specialists2.find(x=>{
          return x.name == menu.name
        })
        
        this.totalTarifSpecialists2 = (this.totalTarifSpecialists2  - (price.price * precount)  ) +(price.price * menu.count) ;
       

        this.totalePersoMenu2Price = this.totalTarifSpecialists2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
        this.data['price2'] = this.totalePersoMenu2Price;
        this.data['remise2'] = this.totalePersoMenu2Price;
        
          this.data['menu2List'] = this.listDynamiqueMenu2;
  
        break;

        case 'entree_chaudes':
          price = this.chaudes2.find(x=>{
          return x.name == menu.name
        })
      
        this.totalTarifChaudes2 = (this.totalTarifChaudes2  - (price.price * precount)  ) + (price.price * menu.count) ;
       
        this.totalePersoMenu2Price = this.totalTarifChaudes2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifFeroids2 || 0);
        this.data['price2'] = this.totalePersoMenu2Price;
        this.data['remise2'] = this.totalePersoMenu2Price;
        
          this.data['menu2List'] = this.listDynamiqueMenu2;

        break;

        case 'entree_froides':
          price = this.froides2.find(x=>{
          return x.name == menu.name
        })
      
        this.totalTarifFeroids2 = (this.totalTarifFeroids2 - (price.price * precount)  ) + (price.price * menu.count) ;
        this.totalePersoMenu2Price = this.totalTarifFeroids2  + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0);
        this.data['price2'] = this.totalePersoMenu2Price;
        this.data['remise2'] = this.totalePersoMenu2Price;
        
          this.data['menu2List'] = this.listDynamiqueMenu2;
        break;


    default:
      break;
}
}





//calcul all perso tarifs
calculTarifPersoMenu(event : MatSelectChange){
  
  
    if(event.value){
      this.showNew = true;
    }
   

  //////
  let from =event.source.ngControl.name
  if(event.source.ngControl.name == 'boissons'){
    
  
     this.boissons = event.value;
     const names = event.value.map(v => {
      
       let boi =this.arrayBoisson.find(b=>{
         return b.name == v.name
       })
       let toret = boi
       if (!boi){
         toret = {id:v._id,name:v.name,from:from,count:1}
        // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
       }
          return toret;
       });
 
    
      this.arrayBoisson = names;
         let filterList = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
         this.listOfTarifNames2 = filterList.filter(function(e){return e});
 
 
 

 
 const totalTarifBoissons = this.boissons.reduce((acc,cur) => {
            
             let cobj = this.listOfTarifNames2.find(x=>{
               return x.name == cur.name
             })
            
             
           return acc + (cur.price * cobj.count );
         },0)
     
     this.totalTarifBoissons = totalTarifBoissons;
     this.totalePersoMenuPrice2 = this.totalTarifBoissons + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
     this.data['price'] = this.totalePersoMenuPrice2;
     this.data['remise'] = this.totalePersoMenuPrice2;
     
      this.data['menuList'] = this.listOfTarifNames2;
      this.data['menuListTosent'] = this.listOfTarifNames2









   
  }

//////////
if(event.source.ngControl.name == 'desserts'){
  
   this.desserts = event.value;
   const names = event.value.map(v => {
  
     let boi =this.arrayDessert.find(b=>{
       return b.name == v.name
     })
     let toret = boi
     if (!boi){
       toret = {id:v._id,name:v.name,from:from,count:1}
      // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
     }
        return toret;
     });

  
     this.arrayDessert = names;
       let filterList = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
       this.listOfTarifNames2 = filterList.filter(function(e){return e});





const totalTarifDesserts = this.desserts.reduce((acc,cur) => {
          
           let cobj = this.listOfTarifNames2.find(x=>{
             return x.name == cur.name
           })
          
           
         return acc + (cur.price * cobj.count );
       },0)
   
       this.totalTarifDesserts = totalTarifDesserts;
   this.totalePersoMenuPrice2 =  this.totalTarifDesserts + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
   this.data['price'] = this.totalePersoMenuPrice2;
   this.data['remise'] = this.totalePersoMenuPrice2;
   
    this.data['menuList'] = this.listOfTarifNames2;
    this.data['menuListTosent'] = this.listOfTarifNames2




}


///////////
if(event.source.ngControl.name == 'pates'){

 this.pates = event.value;
 const names = event.value.map(v => {
 
   let boi =this.arrayPate.find(b=>{
     return b.name == v.name
   })
   let toret = boi
   if (!boi){
     toret = {id:v._id,name:v.name,from:from,count:1}
    // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
   }
      return toret;
   });


   this.arrayPate = names;
     let filterList = this.arrayPate.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
     this.listOfTarifNames2 = filterList.filter(function(e){return e});





const totalTarifPates = this.pates.reduce((acc,cur) => {
       
         let cobj = this.listOfTarifNames2.find(x=>{
           return x.name == cur.name
         })
        
         
       return acc + (cur.price * cobj.count );
     },0)
 
     this.totalTarifPates = totalTarifPates;
 this.totalePersoMenuPrice2 =  this.totalTarifPates + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
 this.data['price'] = this.totalePersoMenuPrice2;
 this.data['remise'] = this.totalePersoMenuPrice2;
 
  this.data['menuList'] = this.listOfTarifNames2;
  this.data['menuListTosent'] = this.listOfTarifNames2

}

///////
if(event.source.ngControl.name == 'nos_specialite'){

  this.specialists = event.value;
 const names = event.value.map(v => {
 
   let boi = this.arraySpeciale.find(b=>{
     return b.name == v.name
   })
   let toret = boi
   if (!boi){
     toret = {id:v._id,name:v.name,from:from,count:1}
    // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
   }
      return toret;
   });


   this.arraySpeciale = names;
     let filterList = this.arraySpeciale.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arrayPate || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
     this.listOfTarifNames2 = filterList.filter(function(e){return e});





const totalTarifSpecialists = this.specialists.reduce((acc,cur) => {
        
         let cobj = this.listOfTarifNames2.find(x=>{
           return x.name == cur.name
         })
        
         
       return acc + (cur.price * cobj.count );
     },0)
 
     this.totalTarifSpecialists =  totalTarifSpecialists;
 this.totalePersoMenuPrice2 =   this.totalTarifSpecialists  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
 this.data['price'] = this.totalePersoMenuPrice2;
 this.data['remise'] = this.totalePersoMenuPrice2;
 
  this.data['menuList'] = this.listOfTarifNames2;
  this.data['menuListTosent'] = this.listOfTarifNames2

}

 ///////
 if(event.source.ngControl.name == 'entree_chaudes'){

   this.chaudes = event.value;
   const names = event.value.map(v => {

     let boi = this.arrayChaud.find(b=>{
       return b.name == v.name
     })
     let toret = boi
     if (!boi){
       toret = {id:v._id,name:v.name,from:from,count:1}
      // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
     }
        return toret;
     });
  
  
     this.arrayChaud = names;
       let filterList = this.arrayChaud.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arrayPate || ""), (this.arraySpeciale|| ""),(this.arrayFeroids || ""));
       this.listOfTarifNames2 = filterList.filter(function(e){return e});
 
  
  
 
  
  const totalTarifChaudes = this.chaudes.reduce((acc,cur) => {
          
           let cobj = this.listOfTarifNames2.find(x=>{
             return x.name == cur.name
           })
         
           
         return acc + (cur.price * cobj.count );
       },0)
   
       this.totalTarifChaudes =  totalTarifChaudes;
   this.totalePersoMenuPrice2 =  this.totalTarifChaudes  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
   this.data['price'] = this.totalePersoMenuPrice2;
   this.data['remise'] = this.totalePersoMenuPrice2;
   
    this.data['menuList'] = this.listOfTarifNames2;
    this.data['menuListTosent'] = this.listOfTarifNames2
  }
 
/////
if(event.source.ngControl.name == 'entree_froides'){

   this.froides = event.value;
   const names = event.value.map(v => {

     let boi = this.arrayFeroids.find(b=>{
       return b.name == v.name
     })
     let toret = boi
     if (!boi){
       toret = {id:v._id,name:v.name,from:from,count:1}
      // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
     }
        return toret;
     });
  
  
     this.arrayFeroids = names;
       let filterList = this.arrayFeroids.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arrayPate || ""), (this.arraySpeciale|| ""),(this.arrayChaud || ""));
       this.listOfTarifNames2 = filterList.filter(function(e){return e});
  
  
  
  
  
  const totalTarifFeroids = this.froides.reduce((acc,cur) => {
          
           let cobj = this.listOfTarifNames2.find(x=>{
             return x.name == cur.name
           })
          
           
         return acc + (cur.price * cobj.count );
       },0)
   
       this.totalTarifFeroids =  totalTarifFeroids;
   this.totalePersoMenuPrice2 =  this.totalTarifFeroids  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);
   this.data['price'] = this.totalePersoMenuPrice2;
   this.data['remise'] = this.totalePersoMenuPrice2;
   
    this.data['menuList'] = this.listOfTarifNames2;
    this.data['menuListTosent'] = this.listOfTarifNames2
  }
 
 
  if(this.totalePersoMenuPrice2 == 0){
    this.showNew = false;
 }

}

//calcul all perso tarifs
calculTarifPersoMenu2(event : MatSelectChange){
 
  
    if(event.value){
      this.showNew = true;
    }
  
    let from =event.source.ngControl.name
  if(event.source.ngControl.name == 'boissons'){
    
     this.boissons2 = event.value;
     const names = event.value.map(v => {
      
       let boi =this.arrayBoisson2.find(b=>{
         return b.name == v.name
       })
       let toret = boi
       if (!boi){
         toret = {id:v._id,name:v.name,from:from,count:1}
        // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
       }
          return toret;
       });
 
    
      this.arrayBoisson2 = names;
         let filterList = this.arrayBoisson2.concat((this.arrayDessert2 || ""),(this.arrayPate2 || ""), (this.arraySpeciale2 || ""), (this.arrayChaud2 || ""),(this.arrayFeroids2 || ""));
         this.listDynamiqueMenu2 = filterList.filter(function(e){return e});

 
 
 
 
 const totalTarifBoissons = this.boissons2.reduce((acc,cur) => {
            
             let cobj = this.listDynamiqueMenu2.find(x=>{
               return x.name == cur.name
             })
            
             
           return acc + (cur.price * cobj.count );
         },0)
     
         this.totalTarifBoissons2 = totalTarifBoissons;
         this.totalePersoMenu2Price = this.totalTarifBoissons2 + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
     this.data['price2'] = this.totalePersoMenu2Price;
     this.data['remise2'] = this.totalePersoMenu2Price;
     
      this.data['menu2List'] = this.listDynamiqueMenu2;
      
  
   
  }

//////////
if(event.source.ngControl.name == 'desserts'){
 
   this.desserts2 = event.value;
   const names = event.value.map(v => {
 
     let boi = this.arrayDessert2.find(b=>{
       return b.name == v.name
     })
     let toret = boi
     if (!boi){
       toret = {id:v._id,name:v.name,from:from,count:1}
      // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
     }
        return toret;
     });

  
     this.arrayDessert2 = names;
       let filterList = this.arrayDessert2.concat((this.arrayBoisson2 || ""),(this.arrayPate2 || ""), (this.arraySpeciale2 || ""), (this.arrayChaud2 || ""),(this.arrayFeroids2 || ""));
       this.listDynamiqueMenu2 = filterList.filter(function(e){return e});





const totalTarifDesserts = this.desserts2.reduce((acc,cur) => {
         
           let cobj = this.listDynamiqueMenu2.find(x=>{
             return x.name == cur.name
           })
          
           
         return acc + (cur.price * cobj.count );
       },0)
   
       this.totalTarifDesserts2 = totalTarifDesserts;
       this.totalePersoMenu2Price = this.totalTarifDesserts2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
   this.data['price2'] = this.totalePersoMenu2Price;
   this.data['remise2'] = this.totalePersoMenu2Price;
   
    this.data['menu2List'] = this.listDynamiqueMenu2;
    


}


///////////
if(event.source.ngControl.name == 'pates'){
  
 this.pates2 = event.value;
 const names = event.value.map(v => {
   
   let boi = this.arrayPate2.find(b=>{
     return b.name == v.name
   })
   let toret = boi
   if (!boi){
     toret = {id:v._id,name:v.name,from:from,count:1}
    // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
   }
      return toret;
   });


   this.arrayPate2 = names;
     let filterList = this.arrayPate2.concat((this.arrayBoisson2 || ""),(this.arrayDessert2 || ""), (this.arraySpeciale2 || ""), (this.arrayChaud2 || ""),(this.arrayFeroids2 || ""));
     this.listDynamiqueMenu2 = filterList.filter(function(e){return e});





const totalTarifPates = this.pates2.reduce((acc,cur) => {
       
         let cobj = this.listDynamiqueMenu2.find(x=>{
           return x.name == cur.name
         })
        
         
       return acc + (cur.price * cobj.count );
     },0)
 
     this.totalTarifPates2 = totalTarifPates;
     this.totalePersoMenu2Price = this.totalTarifPates2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
 this.data['price2'] = this.totalePersoMenu2Price;
 this.data['remise2'] = this.totalePersoMenu2Price;
 
  this.data['menu2List'] = this.listDynamiqueMenu2;

}

///////
if(event.source.ngControl.name == 'nos_specialite'){
    
  this.specialists2 = event.value;
 const names = event.value.map(v => {
   
   let boi = this.arraySpeciale2.find(b=>{
     return b.name == v.name
   })
   let toret = boi
   if (!boi){
     toret = {id:v._id,name:v.name,from:from,count:1}
    // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
   }
      return toret;
   });


   this.arraySpeciale2 = names;
     let filterList = this.arraySpeciale2.concat((this.arrayBoisson2 || ""),(this.arrayDessert2 || ""), (this.arrayPate2 || ""), (this.arrayChaud2 || ""),(this.arrayFeroids2 || ""));
     this.listDynamiqueMenu2 = filterList.filter(function(e){return e});





const totalTarifSpecialists = this.specialists2.reduce((acc,cur) => {
       
         let cobj = this.listDynamiqueMenu2.find(x=>{
           return x.name == cur.name
         })
        
         
       return acc + (cur.price * cobj.count );
     },0)
 
     this.totalTarifSpecialists2 = totalTarifSpecialists;
     this.totalePersoMenu2Price = this.totalTarifSpecialists2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifChaudes2 || 0) + (this.totalTarifFeroids2 || 0);
      this.data['price2'] = this.totalePersoMenu2Price;
      this.data['remise2'] = this.totalePersoMenu2Price;
      
        this.data['menu2List'] = this.listDynamiqueMenu2;

}

 ///////
 if(event.source.ngControl.name == 'entree_chaudes'){
  
   this.chaudes2 = event.value;
  const names = event.value.map(v => {
 
    let boi = this.arrayChaud2.find(b=>{
      return b.name == v.name
    })
    let toret = boi
    if (!boi){
      toret = {id:v._id,name:v.name,from:from,count:1}
     // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
    }
       return toret;
    });
 
 
    this.arrayChaud2 = names;
      let filterList = this.arrayChaud2.concat((this.arrayBoisson2 || ""),(this.arrayDessert2 || ""), (this.arrayPate2 || ""), (this.arraySpeciale2 || ""),(this.arrayFeroids2 || ""));
      this.listDynamiqueMenu2 = filterList.filter(function(e){return e});

 
 
 
 
 const totalTarifChaudes = this.chaudes2.reduce((acc,cur) => {
         
          let cobj = this.listDynamiqueMenu2.find(x=>{
            return x.name == cur.name
          })
         
          
        return acc + (cur.price * cobj.count );
      },0)
  
      this.totalTarifChaudes2 = totalTarifChaudes;
      this.totalePersoMenu2Price = this.totalTarifChaudes2 + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifFeroids2 || 0);
       this.data['price2'] = this.totalePersoMenu2Price;
       this.data['remise2'] = this.totalePersoMenu2Price;
       
         this.data['menu2List'] = this.listDynamiqueMenu2;



  }
 
/////
if(event.source.ngControl.name == 'entree_froides'){

   this.froides2 = event.value;
   const names = event.value.map(v => {
 
     let boi = this.arrayFeroids2.find(b=>{
       return b.name == v.name
     })
     let toret = boi
     if (!boi){
       toret = {id:v._id,name:v.name,from:from,count:1}
      // toret = {id:v._id,name:v.name,from:from,count:1,price:v.price}
     }
        return toret;
     });
  
  
     this.arrayFeroids2 = names;
       let filterList = this.arrayFeroids2.concat((this.arrayBoisson2 || ""),(this.arrayDessert2 || ""), (this.arrayPate2 || ""), (this.arraySpeciale2 || ""),(this.arrayChaud2 || ""));
       this.listDynamiqueMenu2 = filterList.filter(function(e){return e});
 
  
  

  
  const totalTarifFeroids = this.froides2.reduce((acc,cur) => {
          
           let cobj = this.listDynamiqueMenu2.find(x=>{
             return x.name == cur.name
           })
          
           
         return acc + (cur.price * cobj.count );
       },0)
   
       this.totalTarifFeroids2  = totalTarifFeroids;
       this.totalePersoMenu2Price = this.totalTarifFeroids2  + (this.totalTarifBoissons2 || 0) + (this.totalTarifDesserts2 || 0) + (this.totalTarifPates2 || 0) + (this.totalTarifSpecialists2 || 0) + (this.totalTarifChaudes2 || 0);
        this.data['price2'] = this.totalePersoMenu2Price;
        this.data['remise2'] = this.totalePersoMenu2Price;
        
          this.data['menu2List'] = this.listDynamiqueMenu2;
  }


  if(this.totalePersoMenu2Price == 0){
    this.showNew = false;
 }

}


/* close the dialog after confirmation */
onCancelClick(){
  this.dialogRef.close();
}

deleteReservation1(data:any){
  
      Swal.fire({
        title: "êtes vous sure?",
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#96a2b4",
        confirmButtonText: "Oui",
      }).then((result) => {
       
        if (result.value) {
          this.service.deleteMenu(data.menuID).subscribe((resp:any) => {
            
            this.showNotification(
              'snackbar-danger',
              "la réservation a été supprimée avec succès",
              'top',
              'end'
            );
           
           })
        }
      });

}


  deleteReservation2(data:any){
   
   
        Swal.fire({
          title: "êtes vous sure?",
          showCancelButton: true,
          cancelButtonText: "Annuler",
          confirmButtonColor: "#f44336",
          cancelButtonColor: "#96a2b4",
          confirmButtonText: "Oui",
        }).then((result) => {
          
          if (result.value) {
           
              if(data.menuID2){
                this.service.deleteMenu(data.menuID2).subscribe((data:any) => {
              
                this.showNotification(
                  'snackbar-danger',
                  "la réservation a été supprimée avec succès",
                  'top',
                  'end'
                );
              
                
              })
              }

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

changeFirstView(){
  this.showview = true
  this.isUnderline = true;
 
  
}

changeSecondView(){
  this.showview = false
  this.isUnderline = false;
  
  
}


search(query:string)
  {
    
}
  

  displayFn(subject:any)
  {
     return subject ? subject.clientID.first_name : undefined;
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
