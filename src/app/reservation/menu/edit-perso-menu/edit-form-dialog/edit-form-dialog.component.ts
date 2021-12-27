import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

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
  "petit déjeune",
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
arrayBoisson:any;
arrayDessert:any;
arrayPate:any;
arraySpeciale:any;
arrayChaud:any;
arrayFeroids :any;
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

globalMenu  = [{name:'', price:0}];
arrayglobalMenu:any;
totalTarifGlobal:any;
globalOfListTarifNames:any;
showMenuDetails = true;
panelOpenState = false;


///////////Update solution //////////


 // List des tarifs personaliser
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
   
 ]

 specialists:any;
 chaudes:any;
 froides:any;
 listOfTarifNames2:any;
 totalePersoMenuPrice2:any;
 reservationMenuForm: FormGroup;
 showNew = false;
 menuID:any;
/////////////////////




  constructor( public dialogRef: MatDialogRef<EditFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder) { 
      this.reservationMenuForm = this.createContactForm();
    }

  ngOnInit(): void {

    console.log('data edit form dialog >>>',this.data);
    
    this.first_name = this.data['first_name'];
    this.user = this.data['first_name'];
    this.roomName = this.data['roomName'];
    this.repasType = this.data['repasType'];
    this.comment = this.data['comment'];
    this.price = this.data['price'];
    this.froidsMenuList = this.data['menuList']
    this.BoissonMenuList = this.data['menuList'];
    this.chaudsMenuList = this.data['menuList'];
    this.DessertMenuList = this.data['menuList'];
    this.PatsMenuList = this.data['menuList'];
    this.specialistMenuList  = this.data['menuList'];
    this.menuID = this.data['menuID']
    console.log('this.menuList>>>',this.BoissonMenuList);
   
    this.initLitsMenuPrice()
    
    
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





 initLitsMenuPrice(){
  this.chaudsMenuList.forEach(item => {
    console.log('item boissons>>>>',item)
    
    const resultat = this.globalLisMenus.find( menu => {
      if(menu.name === item){
        if(this.globalMenu.includes(menu)){
            this.globalMenu.splice(menu)
           
            console.log('boissons include>>>', this.globalMenu);
            
        }
        this.globalMenu.push(menu)
        console.log('list of item>>>', menu)
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
 console.log('totale persomenu boissons',this.totalePersoMenuPrice1);
 }
  



//calcul all perso tarifs
calculTarifPersoMenu(event : MatSelectChange){
  console.log('event value>>>', event.value);
  
    if(event.value){
      this.showNew = true;
    }
  //////
  if(event.source.ngControl.name == 'boissons'){
    
    this.boissons = event.value;
    const names = event.value.map(v => {
         return v.name;
      });
   
     this.arrayBoisson = names;
    // this.listOfTarifNames = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || "")); 
        let filterList = this.arrayBoisson.concat((this.arrayDessert || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
            this.listOfTarifNames2 = filterList.filter(function(e){return e});



          const totalTarifBoissons = this.boissons.reduce((acc,cur) => {
          return acc + cur.price;
        },0)
    
    this.totalTarifBoissons = totalTarifBoissons;
    this.totalePersoMenuPrice2 = this.totalTarifBoissons + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
    this.data['price'] = this.totalePersoMenuPrice2;
    console.log('totale persomenu boissons',this.listOfTarifNames2);
   this.data['menuListTosent'] = this.listOfTarifNames2;
   
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
 this.listOfTarifNames2 = filterList.filter(function(e){return e});
///
    const totalTarifDesserts = this.desserts.reduce((acc,cur) => {
    return acc + cur.price;
     },0)
  
   this.totalTarifDesserts = totalTarifDesserts;
   this.totalePersoMenuPrice2 = this.totalTarifDesserts + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
   this.data['price'] = this.totalePersoMenuPrice2;
   console.log('totale persomenu dessert',this.listOfTarifNames2);
   this.data['menuListTosent'] = this.listOfTarifNames2;
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
 this.listOfTarifNames2 = filterList.filter(function(e){return e});


   const totalTarifPates = this.pates.reduce((acc,cur) => {
   return acc + cur.price;
  },0)
 console.log('tarif pates price >>>', totalTarifPates);
 this.totalTarifPates = totalTarifPates;
 this.totalePersoMenuPrice2 =  this.totalTarifPates + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
 this.data['price'] = this.totalePersoMenuPrice2;
 console.log('totale persomenu pates',this.listOfTarifNames2);
 this.data['menuListTosent'] = this.listOfTarifNames2;

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

 this.listOfTarifNames2 = filterList.filter(function(e){return e});


     const totalTarifSpecialists = this.specialists.reduce((acc,cur) => {
     return acc + cur.price;
  },0)
  console.log('tarif specialiste price >>>', totalTarifSpecialists);
  this.totalTarifSpecialists = totalTarifSpecialists;
  this.totalePersoMenuPrice2 =  this.totalTarifSpecialists + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
  this.data['price'] = this.totalePersoMenuPrice2;
  console.log('totale persomenu specialiste',this.listOfTarifNames2);
  this.data['menuListTosent'] = this.listOfTarifNames2;

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
 let filterList = this.arrayChaud.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayBoisson || ""),(this.arrayFeroids || ""))

 this.listOfTarifNames2 = filterList.filter(function(e){return e});


    const totalTarifChaudes = this.chaudes.reduce((acc,cur) => {
    return acc + cur.price;
   },0)
   console.log('tarif chaudes price >>>', totalTarifChaudes);
   this.totalTarifChaudes = totalTarifChaudes;
   this.totalePersoMenuPrice2 =  this.totalTarifChaudes + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
   this.data['price'] = this.totalePersoMenuPrice2;
   console.log('totale persomenu chaud',this.listOfTarifNames2);
   this.data['menuListTosent'] = this.listOfTarifNames2;
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

 this.listOfTarifNames2 = filterList.filter(function(e){return e});


  const totalTarifFeroids = this.froides.reduce((acc,cur) => {
  return acc + cur.price;
  },0)
  console.log('tarif feroids price >>>', totalTarifFeroids);
   this.totalTarifFeroids = totalTarifFeroids;
   this.totalePersoMenuPrice2 = this.totalTarifFeroids + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);
   this.data['price'] = this.totalePersoMenuPrice2;
   console.log('totale persomenu froids',this.listOfTarifNames2);
   this.data['menuListTosent'] = this.listOfTarifNames2;
  }


}









  search(query:string)
  {
    /*
    console.log('query>>>',query);
    if(query == ''){
      // this.showview = true
    }
     this.searchuser = (query) ? this.users.filter( users =>
       users.clientID.first_name.toLowerCase().includes(query.toLowerCase()) ||
       users.clientID.last_name.toLowerCase().includes(query.toLowerCase()) 
       ) 
       : this.users;*/
  }
  

  displayFn(subject:any)
  {
     return subject ? subject.clientID.first_name : undefined;
  }
  
  BoissonsMenu(event:any){
      console.log('event from boisssonMenu>>>', event);
      
  }

  onChange(event : MatSelectChange){
    console.log('on change>>>', event);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
