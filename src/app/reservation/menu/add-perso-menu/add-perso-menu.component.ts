import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';

@Component({
  selector: 'app-add-perso-menu',
  templateUrl: './add-perso-menu.component.html',
  styleUrls: ['./add-perso-menu.component.scss']
})
export class AddPersoMenuComponent implements OnInit {


  reservationMenuForm: FormGroup;
  user:any;
  searchuser!: any[];
  users!: any[];
  clientID:string;
  roomName:any;


  
 

 DessertsList: any[];
 BoissonsList: any[];
 PatesList:any[];
 NosSpecialistesList:any[];
 EntreeChaudesList:any[];
 EntreeFeroidsList:any[];
   //list of personalize tarifs variable 
 boissons:any;
 desserts:any;
 pates: any = [] ;
 specialists:any = [];
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
  showview = true;
  isUnderline = true;
  listOfTarifNames:any;
  arrayBoisson:any = [];
  arrayDessert:any =[];
  arrayPate:any = [];
  arraySpeciale:any = [];
  arrayChaud:any = [];
  arrayFeroids:any = [];
  RepasStandardTypeList: any[] = [
    "petit déjeuner",
     "déjeuner"  
  ]
  RepasPersoTypeList: any[] = [
   
    "déjeuner",
    "diner"
  ]

  soda = 0;
  eau = 0;

  remisePrice:any;

  constructor(
    private service : ReservationServiceService,
    public dialogRef: MatDialogRef<AddPersoMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private fb: FormBuilder, 
    private snackBar : MatSnackBar,
  ) {
    this.reservationMenuForm = this.createContactForm();
   }

  ngOnInit(): void {

    if(this.user == undefined){
       this.user = '';
    }else{
    }

    if(this.roomName == undefined){
       this.roomName = '';
    }
   
    this.getUserList();
    this.getPlatList();
  }



  createContactForm(): FormGroup {
    
    
    return this.fb.group({
      type : [ 'menu' ],
      first_name : ['' , Validators.required],
      last_name : ['' , Validators.required],
      first:['' , Validators.required],
      number_phone:['',Validators.required],
      number_heure:['13:00',Validators.required],
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
      comment : [''],
      status : ['COMMANDE'],
      extra : [''],
      price : [''],
    });
  
  }
   


getPlatList(){
  this.service.getPlatListByCategory().pipe(take(1)).subscribe((plats:any[]) => {
    
    
        this.DessertsList = plats[0];
        this.BoissonsList = plats[1];
        this.PatesList = plats[2];
        this.NosSpecialistesList = plats[3];
        this.EntreeChaudesList = plats[4];
        this.EntreeFeroidsList = plats[5];

        
  })
}


  
getUserList(){
this.service.getReservationList().pipe(take(1)).subscribe((users:any[]) => {
 
  this.users = users;
  this.searchuser = this.users = users;
})


}

  search(query:string)
  {
   
    if(query == ''){
      // this.showview = true
    }
     this.searchuser = (query) ? this.users.filter( users =>
       users.clientID.first_name.toLowerCase().includes(query.toLowerCase()) ||
       users.clientID.last_name.toLowerCase().includes(query.toLowerCase()) 
       ) 
       : this.users;
  }


  displayFn(subject:any)
  {
     return subject ? subject.clientID.first_name : undefined;
  }


  selected(event: MatAutocompleteSelectedEvent): void {
   
     
      this.user = event.option.value.clientID.first_name;
      this.clientID = event.option.value.clientID._id;
     
      this.roomName = event.option.value.roomID.name;
  
      
     
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
        this.totalePersoMenuPrice = this.totalTarifBoissons + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
        this.remisePrice = this.totalePersoMenuPrice ;
       //  menu.price = price.price * menu.count
        break;
        case 'desserts':
            price = this.desserts.find(x=>{
            return x.name == menu.name
          })
         
          this.totalTarifDesserts = (this.totalTarifDesserts  - (price.price * precount)  ) +(price.price * menu.count) ;
          this.totalePersoMenuPrice = this.totalTarifDesserts  + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
          this.remisePrice = this.totalePersoMenuPrice ;
        //  menu.price = price.price * menu.count
          break;

          case 'pates':
            price = this.pates.find(x=>{
            return x.name == menu.name
          })
        
          this.totalTarifPates = (this.totalTarifPates  - (price.price * precount)  ) +(price.price * menu.count) ;
          this.totalePersoMenuPrice = this.totalTarifPates  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
          this.remisePrice = this.totalePersoMenuPrice ;
          break;
          
          case 'nos_specialite':
            price = this.specialists.find(x=>{
            return x.name == menu.name
          })
        
          this.totalTarifSpecialists = (this.totalTarifSpecialists  - (price.price * precount)  ) +(price.price * menu.count) ;
          this.totalePersoMenuPrice = this.totalTarifSpecialists  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
          this.remisePrice = this.totalePersoMenuPrice ;
          break;

          case 'entree_chaudes':
            price = this.chaudes.find(x=>{
            return x.name == menu.name
          })
       
          this.totalTarifChaudes = (this.totalTarifChaudes  - (price.price * precount)  ) +(price.price * menu.count) ;
          this.totalePersoMenuPrice = this.totalTarifChaudes  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
          this.remisePrice = this.totalePersoMenuPrice ;
          break;

          case 'entree_froides':
            price = this.froides.find(x=>{
            return x.name == menu.name
          })
      
          this.totalTarifFeroids = (this.totalTarifFeroids - (price.price * precount)  ) +(price.price * menu.count) ;
          this.totalePersoMenuPrice = this.totalTarifFeroids  + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);
          this.remisePrice = this.totalePersoMenuPrice ;
          break;


      default:
        break;
    }
     
      
  
   
    
  }

  
//calcul all perso tarifs
calculTarifPersoMenu(event : MatSelectChange){
 
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
            this.listOfTarifNames = filterList.filter(function(e){return e});





          const totalTarifBoissons = this.boissons.reduce((acc,cur) => {
           
            let cobj = this.listOfTarifNames.find(x=>{
              return x.name == cur.name
            })
           
            
          return acc + (cur.price * cobj.count );
        },0)
    
    this.totalTarifBoissons = totalTarifBoissons;
    this.totalePersoMenuPrice = this.totalTarifBoissons + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
    this.remisePrice = this.totalePersoMenuPrice ;
   
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

      }
         return toret;
      });

   
     this.arrayDessert = names;
        let filterList = this.arrayDessert.concat((this.arrayBoisson || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
            this.listOfTarifNames = filterList.filter(function(e){return e});





          const totalTarifDesserts = this.desserts.reduce((acc,cur) => {
           
            let cobj = this.listOfTarifNames.find(x=>{
              return x.name == cur.name
            })
          
            
          return acc + (cur.price * cobj.count );
        },0)
    
        this.totalTarifDesserts = totalTarifDesserts;
    this.totalePersoMenuPrice = this.totalTarifDesserts + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
    this.remisePrice = this.totalePersoMenuPrice ;





 /* this.desserts = event.value;
  ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayDessert= names;
 let filterList =  this.arrayDessert.concat((this.arrayBoisson || ""),(this.arrayPate || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 this.listOfTarifNames = filterList.filter(function(e){return e});
///
    const totalTarifDesserts = this.desserts.reduce((acc,cur) => {
    return acc + cur.price;
     },0)
  
   this.totalTarifDesserts = totalTarifDesserts;
   this.totalePersoMenuPrice = this.totalTarifDesserts + (this.totalTarifBoissons || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
   this.remisePrice = this.totalePersoMenuPrice ;*/
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

      }
         return toret;
      });

   
      this.arrayPate = names;
        let filterList = this.arrayPate.concat((this.arrayBoisson || ""),(this.arrayDessert || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
            this.listOfTarifNames = filterList.filter(function(e){return e});





          let totalTarifPates = this.pates.reduce((acc,cur) => {
           
            let cobj = this.listOfTarifNames.find(x=>{
              return x.name == cur.name
            })
          
            
          return acc + (cur.price * cobj.count );
        },0)
    
        this.totalTarifPates  = totalTarifPates;
    this.totalePersoMenuPrice = this.totalTarifPates + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
    this.remisePrice = this.totalePersoMenuPrice ;




 /*   this.pates = event.value;

   ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayPate= names;
 let filterList = this.arrayPate.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))
 this.listOfTarifNames = filterList.filter(function(e){return e});


   const totalTarifPates = this.pates.reduce((acc,cur) => {
   return acc + cur.price;
  },0)
 
 this.totalTarifPates = totalTarifPates;
 this.totalePersoMenuPrice =  this.totalTarifPates + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
 this.remisePrice = this.totalePersoMenuPrice ;*/

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

    }
       return toret;
    });

 
    this.arraySpeciale = names;
      let filterList = this.arraySpeciale.concat((this.arrayBoisson || ""),(this.arrayDessert || ""), (this.arrayPate || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""));
          this.listOfTarifNames = filterList.filter(function(e){return e});




const totalTarifSpecialists = this.specialists.reduce((acc,cur) => {
         
          let cobj = this.listOfTarifNames.find(x=>{
            return x.name == cur.name
          })
         
          
        return acc + (cur.price * cobj.count );
      },0)
  
      this.totalTarifSpecialists  = totalTarifSpecialists;
  this.totalePersoMenuPrice = this.totalTarifSpecialists + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
  this.remisePrice = this.totalePersoMenuPrice ;








    /* this.specialists = event.value;
     ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arraySpeciale= names;
 let filterList = this.arraySpeciale.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arrayPate || ""), (this.arrayChaud || ""),(this.arrayFeroids || ""))

 this.listOfTarifNames = filterList.filter(function(e){return e});


     const totalTarifSpecialists = this.specialists.reduce((acc,cur) => {
     return acc + cur.price;
  },0)
 
  this.totalTarifSpecialists = totalTarifSpecialists;
  this.totalePersoMenuPrice =  this.totalTarifSpecialists + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifChaudes || 0) + (this.totalTarifFeroids || 0);
  this.remisePrice = this.totalePersoMenuPrice ;*/

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

    }
       return toret;
    });

 
    this.arrayChaud = names;
      let filterList = this.arrayChaud.concat((this.arrayBoisson || ""),(this.arrayDessert || ""), (this.arrayPate || ""), (this.arraySpeciale || ""),(this.arrayFeroids || ""));
          this.listOfTarifNames = filterList.filter(function(e){return e});




const totalTarifChaudes  = this.chaudes.reduce((acc,cur) => {
        
          let cobj = this.listOfTarifNames.find(x=>{
            return x.name == cur.name
          })
         
          
        return acc + (cur.price * cobj.count );
      },0)
  
      this.totalTarifChaudes  = totalTarifChaudes ;
      this.totalePersoMenuPrice =  this.totalTarifChaudes + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
      this.remisePrice = this.totalePersoMenuPrice ;





  /* this.chaudes = event.value;

    ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayChaud= names;
 let filterList = this.arrayChaud.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""),(this.arrayFeroids || ""),(this.arrayPate || ""))

 this.listOfTarifNames = filterList.filter(function(e){return e});


    const totalTarifChaudes = this.chaudes.reduce((acc,cur) => {
    return acc + cur.price;
   },0)

   this.totalTarifChaudes = totalTarifChaudes;
   this.totalePersoMenuPrice =  this.totalTarifChaudes + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifFeroids || 0);
   this.remisePrice = this.totalePersoMenuPrice ;*/
  }
 
/////
if(event.source.ngControl.name == 'entree_froides'){



  
  this.froides  = event.value;
  const names = event.value.map(v => {
   
    let boi = this.arrayFeroids.find(b=>{
      return b.name == v.name
    })
    let toret = boi
    if (!boi){
      toret = {id:v._id,name:v.name,from:from,count:1}

    }
       return toret;
    });

 
    this.arrayFeroids = names;
      let filterList = this.arrayFeroids.concat((this.arrayBoisson || ""),(this.arrayDessert || ""), (this.arrayPate || ""), (this.arraySpeciale || ""),(this.arrayChaud || ""));
          this.listOfTarifNames = filterList.filter(function(e){return e});





const totalTarifFeroids  = this.froides.reduce((acc,cur) => {
         
          let cobj = this.listOfTarifNames.find(x=>{
            return x.name == cur.name
          })
          
          
        return acc + (cur.price * cobj.count );
      },0)
  
      this.totalTarifFeroids  = totalTarifFeroids ;
      this.totalePersoMenuPrice =  this.totalTarifFeroids + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);
      this.remisePrice = this.totalePersoMenuPrice ;



  /*
  this.froides = event.value;
  ////
  const names = event.value.map(v => {
    return v.name;
 });
 this.arrayFeroids= names;
 let filterList = this.arrayFeroids.concat((this.arrayDessert || ""),(this.arrayBoisson || ""), (this.arraySpeciale || ""), (this.arrayChaud || ""),(this.arrayPate || ""))

 this.listOfTarifNames = filterList.filter(function(e){return e});


  const totalTarifFeroids = this.froides.reduce((acc,cur) => {
  return acc + cur.price;
  },0)
 
   this.totalTarifFeroids = totalTarifFeroids;
   this.totalePersoMenuPrice = this.totalTarifFeroids + (this.totalTarifBoissons || 0) + (this.totalTarifDesserts || 0) + (this.totalTarifPates || 0) + (this.totalTarifSpecialists || 0) + (this.totalTarifChaudes || 0);
   this.remisePrice = this.totalePersoMenuPrice ;*/
 
  }


}



confirmAdd(): void {
    
 

if(this.clientID){
 

  const reservationPersoForm  = {
    comment : this.reservationMenuForm.get('comment').value,
    price : this.totalePersoMenuPrice,
    clientID:this.clientID,
    menuList: this.listOfTarifNames,
    isPersonalize:true,
    entrePerso:this.reservationMenuForm.get('entrePerso').value,
    number_heure:this.reservationMenuForm.get('number_heure').value,
    remise: this.remisePrice
   }
   
   
   
   this.service.addPersoReservationMenu(reservationPersoForm).subscribe((data : any) => {
   
     this.showNotification(
         'snackbar-success',
          data.message,
         'top',
         'end'
       );  

       
  },err => {
    
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
