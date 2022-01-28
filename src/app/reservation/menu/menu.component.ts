import { ChangeDetectorRef, Component, ElementRef, Injector, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { reservationMenu } from "./menu.model";
import { FormDialogComponent } from "../menu/form-dialog/form-dialog.component";
import { MatMenuTrigger } from "@angular/material/menu";
import { DeleteDialogComponent } from "./form-dialog/delete/delete.component";
import { ReservationServiceService } from "src/app/core/service/reservation-service.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import Swal from "sweetalert2";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { MatSelectChange } from "@angular/material/select";
import { MatSort } from "@angular/material/sort";
import { EditPersoMenuComponent } from "./edit-perso-menu/edit-perso-menu.component";
import { formatDate } from "@angular/common";
import { take } from "rxjs/operators";
import { RightSidebarComponent } from "src/app/layout/right-sidebar/right-sidebar.component";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"],
})
export class MenuComponent implements OnInit {
  @ViewChild('editModal') editModal : TemplateRef<any>;
  contextMenu: MatMenuTrigger;
  id = 0 ;
  contextMenuPosition = { x: '0px', y: '0px' };
  displayedColumns = [
    "startDate",
    "name",
    "heure",
    "Client",
    "numberPhone",
    "RoomName",
    "price",
    "status",
    "Actions",
  ];
  MenuReservationsList : any;
  reservationData : any
  menus : any
  rooms : any
  Menus : any
  filterData: any;
  MenuPrice = 0;
  PriceTotal = 0 ;
  entree : any;
  dessert : any;
  suite : any
  sodaPrice = 0; 
  EauPrice = 0;
  showMenuDetails = false;
  today = new Date() ;
  menuIDfromedit:any;
  RepasStandardTypeList: any[] = [
    "petit déjeuner",
     "déjeuner"  
  ]
  RepasPersoTypeList: any[] = [
    "petit déjeune",
    "déjeuner",
    "diner"
  ]

  defaultValue ="petit déjeune";
  ptdejprice = 20;

  number_geuste:any;
  isUnderline = true;
  showview = true;
  editPersoMenuComponent:any;
  menuID:any;
  soda = 0;
  eau = 0;
  remisePrice:any;

  MenuHautSaison: any[] ;
  MenuBasSaison: any[];



    TableSourceData : MatTableDataSource<any> =  new MatTableDataSource;
  

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
}
 
  reservationMenuEditForm: FormGroup;
  modalData: any;
  Chambres: any;
  dataSource:any;

  
  MenuPrice1 = true;
  MenuPriceValue = 0;
  MenuPrice2 = false;
  menuPdj = false;
  menuSta = false;
  ptDejPrice = 20
  counter = 0;
  counter2 = 0;
  
  showStaMenu = false;
  isDisabled = false;
  showHautmenu = false;
  showBasmenu = false;

  menuType:any;
  menuName:any;
  NaturSaison: any[] = [
    "Haut de saison",
     "Bas de saison"  
  ]
  showHautSaison = true;
  natureType:any;
  showNatureSaison = true;
   repasType:any;
  
  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog , 
    private service : ReservationServiceService ,
     private snackBar : MatSnackBar,
    private modalService : NgbModal,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialogRef: MatDialog,
    private inj: Injector
    ) {}


  onSubmit() {}

  ngOnInit() {
    this.getMenuReservations()
  //  this.getMenus();
    this.assignComponent('cow');
    this.getListNatureMenus();
 
 
   
  }



  //////////////////////// Start Menu Standar Task///////////////////////////////////
  ngAfterViewInit() {

    
    this.TableSourceData.paginator = this.paginator;
  
  }

 
  setDataSourceAttributes() {
    this.TableSourceData.paginator = this.paginator;
   // this.TableSourceData.sort = this.sort;

    if (this.paginator) {
       //this.applyFilter('');
    }
}


  

  getMenus(){
    this.service.getMenuList().pipe(take(1)).subscribe((data : any)=>{
     
      console.log('menus>>>', data);
      
     this.Menus = data.reverse();
    })
  }


  
getListNatureMenus(){
  this.service.getListNatureMenus().pipe(take(1)).subscribe((data :any ) => {
        console.log('nature list>>>', data );
        this.MenuHautSaison = data[0];
        this.MenuBasSaison = data[1];
  })
}

  


search(term: string) {

  this.TableSourceData.data = this.filterData.filter(reservation => 
    reservation.clientID.first_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.clientID.last_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.number_heure.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.clientID.number_phone.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.price.includes(term) ||  
    reservation.start.includes(term) || 
    reservation.typeRepas.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.status_reservation.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
    reservation.menuID.name.trim().toLowerCase().includes(term.trim().toLowerCase()) 
  )
}
  


assignComponent(component){
  if(component === 'cow'){
    this.isUnderline = false;
    this.showview = false
      this.editPersoMenuComponent = EditPersoMenuComponent
      
  }
}

changePersoView(){
 
  this.isUnderline = false;
 
}

changeStandardView(){
  this.showview = true
  this.isUnderline = true;
  this.editPersoMenuComponent = ''
 
}



/* get list of menu standard */
getMenuReservations(){
 

    this.service.getListOfMenusReservation().pipe(take(1)).subscribe((menusReservation:any) => {
       
             this.filterData = menusReservation
            this.TableSourceData.data = menusReservation
          
    })
    
 }




addNew() {
    let tempDirection;
    if (localStorage.getItem("isRtl") === "true") {
      tempDirection = "rtl";
    } else {
      tempDirection = "ltr";
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width:'1200px',
      height:'670px',
      data: {
        reservationMenu: null,
        action: "add",
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      
        this.getMenuReservations();
      if (result === 1) {
        
         this.getMenuReservations();
      }

    });
 }



deleteSingleRow(row) {
  
  Swal.fire({
    title: "êtes vous sure?",
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonColor: "#f44336",
    cancelButtonColor: "#96a2b4",
    confirmButtonText: "Oui",
  }).then((result) => {
   
    if (result.value) {
      this.service.deleteReservation(row._id).subscribe((data:any) => {
       
        

        this.showNotification(
          'snackbar-danger',
           "la réservation a été supprimée avec succès",
          'top',
          'end'
        );
        this.getMenuReservations();
      })
    }
  });
}


editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        reservationMenu: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result === 1) {
      //   // When using an edit things are little different, firstly we find record inside DataService by id
      //   const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
      //     (x) => x.id === this.id
      //   );
      //   // Then you update that record using data from dialogData (values you enetered)
      //   this.exampleDatabase.dataChange.value[foundIndex] =
      //     this.bookingService.getDialogData();
      //   // And lastly refresh table
      //   this.refreshTable();
      //   this.showNotification(
      //     'black',
      //     'Edit Record Successfully...!!!',
      //     'bottom',
      //     'center'
      //   );
      // }
    });
  }


  openEditModal(row){

    
  this.repasType = row.typeRepas;
  console.log('row from open row>>>', row);
     
 /* if(row.menuID.description == ""){
     if(row.typeRepas == 'petit déjeuner'){
      this.showHautmenu = false;
      this.showBasmenu = false;
      this.showNatureSaison = false ;
    }
  }*/
       
     
   
    
       if(row.menuID.description == 'haut'){
        this.showNatureSaison = true;
        this.natureType = "Haut de saison" ;
      this.showHautmenu = true;
      this.showBasmenu = false;
    
       
    }else if(row.menuID.description == 'bas'){
      this.showBasmenu = true;
      this.showHautmenu = false; 
      this.showNatureSaison = true ;
      this.natureType = "Bas de saison" ;
       
    }else{
      row.menuID.description == ''
      this.showBasmenu = false;
      this.showHautmenu = false; 
      this.showNatureSaison = false ;
    }
  
   
     
    this.modalData = row;
    if(this.modalData){
       this.number_geuste = this.modalData.number_guests;
       this.eau = this.modalData.nb_eau;
       this.soda = this.modalData.nb_soda;
       this.EauPrice = this.eau
       this.sodaPrice = this.soda * 2 ;
    }
    this.service.getMenuByDescreption(this.modalData.menuID.name,row.menuID.description).subscribe((menu :any) => {
      console.log("menu>>>>", menu);
      
       this.MenuPrice = menu[0].price;
      
  })


    /*if(this.modalData.menuID.name == 'Menu 1'){
    
      this.MenuPrice = 150
    
    }else if(this.modalData.menuID.name == 'Menu 2'){
     
        this.MenuPrice = 80
   
    }else if(this.modalData.menuID.name == 'Menu 3'){
       
        this.MenuPrice = 90
       
    }else if(this.modalData.menuID.name == 'Menu 4'){
       
        this.MenuPrice = 120
       
    }else{
       this.MenuPrice = 20;
    }*/
    this.service.getMenuByName(this.modalData.menuID.name).subscribe((menu :any) => {
    
      this.menuID = menu._id;
      
  })


 
     

   
    this.PriceTotal = +this.modalData.price;
    this.remisePrice = +this.modalData.remise;
    this.reservationMenuEditForm = this.fb.group({
      _id : [this.modalData._id ],
      first_name : [this.modalData.clientID.first_name , Validators.required],
      last_name : [this.modalData.clientID.last_name , Validators.required],
      number_phone : [this.modalData.clientID.number_phone, Validators.required],
      roomID : [this.modalData.roomID , Validators.required],
      menuID : [this.modalData.menuID.name ],
      startDate : [this.modalData.start , Validators.required],
      number_heure: [this.modalData.number_heure , Validators.required],
      number_guests : [this.modalData.number_guests , Validators.required],
      comment : [this.modalData.comment ],
      status : [this.modalData.status_reservation],
      price : [this.modalData.price , Validators.required],
      entreSta : [this.modalData.typeRepas],
      remise : [this.modalData.remise ],
    });

    this.dialog.open( this.editModal, {
          width:'1200px',
          height:'900px'
    });
  }


  closeModal(){
    this.dialog.closeAll()
    this.getMenuReservations()
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  

  showNatureSaisonType(event:MatSelectChange){
    console.log('event saison>>>>', event.value );
    if(event.value == 'Bas de saison'){
      this.showHautmenu = false ;
      this.showBasmenu = true;
      this.MenuPrice = 0;
      this.soda = 0;
      this.eau = 0;
      this.EauPrice = 0 ;
      this.sodaPrice = 0;
      this.PriceTotal = 0;
      this.remisePrice = 0;
    }else{
      this.showHautmenu = true ;
      this.showBasmenu = false;
      this.MenuPrice = 0;
      this.soda = 0;
      this.eau = 0;
      this.EauPrice = 0 ;
      this.sodaPrice = 0;
      this.PriceTotal = 0;
      this.remisePrice = 0;
    }
  }




  showMenu(event:MatSelectChange){
    console.log('event>>>>', this.reservationMenuEditForm.get('menuID').value );
    
   
    this.service.getMenuByName(event.value).pipe(take(1)).subscribe((menu :any) => {
      console.log("menu >>>", menu.price);
      this.MenuPrice = menu.price;
      this.menuID = menu._id;
      this.calculTotal(this.number_geuste , this.MenuPrice );
      this.soda = 0;
      this.eau = 0;
      this.EauPrice = 0 ;
      this.sodaPrice = 0;
    
      
  })


  /*  if(event.value == 'Menu 1'){
         this.entree = "Trio de salade";
         this.dessert = "Assiette de fruits de saison";
         this.suite = "Agneau à la gargoulette";
         this.showMenuDetails = true ; 
         this.MenuPrice = 150
         this.MenuPrice2 = false;
         this.calculTotal(this.number_geuste , this.MenuPrice );
         this.soda = 0;
          this.eau = 0;
          this.EauPrice = 0 ;
          this.sodaPrice = 0;
          this.service.getMenuByName(event.value).pipe(take(1)).subscribe((menu :any) => {
    
            this.menuID = menu._id;
            
        })
    }else if(event.value == 'Menu 2'){
        this.entree = "Trio de salade";
        this.dessert = "Assiette de fruits de saison";
        this.suite = "grillade mixte";
        this.showMenuDetails = true ; 
        this.MenuPrice = 80
        this.MenuPrice2 = false;
        this.calculTotal(this.number_geuste , this.MenuPrice );
        this.soda = 0;
        this.eau = 0;
        this.EauPrice = 0 ;
        this.sodaPrice = 0;
      this.service.getMenuByName(event.value).pipe(take(1)).subscribe((menu :any) => {
    
        this.menuID = menu._id;
        
    })
    }else if(event.value == 'Menu 3'){
        this.entree = "Trio de salade";
        this.dessert = "Assiette de fruits de saison";
        this.suite = "Poisson grillé";
        this.showMenuDetails = true ; 
        this.MenuPrice = 90
        this.MenuPrice2 = false;
        this.calculTotal(this.number_geuste , this.MenuPrice );
        this.soda = 0;
        this.eau = 0;
        this.EauPrice = 0 ;
        this.sodaPrice = 0;
      this.service.getMenuByName(event.value).pipe(take(1)).subscribe((menu :any) => {
    
        this.menuID = menu._id;
        
    })
    }else if(event.value == 'Menu 4')  {
        this.entree = "Trio de salade";
        this.dessert = "Assiette de fruits de saison";
        this.suite = "couscous à l'agneau";
        this.showMenuDetails = true ; 
        this.MenuPrice = 120
        this.MenuPrice2 = false;
        this.calculTotal(this.number_geuste , this.MenuPrice );
        this.soda = 0;
        this.eau = 0;
        this.EauPrice = 0 ;
        this.sodaPrice = 0;
      this.service.getMenuByName(event.value).pipe(take(1)).subscribe((menu :any) => {
    
        this.menuID = menu._id;
        
    })
    }else{
      this.showMenuDetails = false ;
      this.MenuPrice2 = true;
    }*/



   
  }



  showMenuStandard(event:MatSelectChange){
  
    console.log('show menu>>>',this.reservationMenuEditForm.value.remise);
    
    if(event.value === 'petit déjeuner'){
      this.MenuPrice2 = true;
      this.MenuPrice1 = false;
      this.menuPdj = true;
      this.menuSta = false;
      this.isDisabled= true;
      this.showMenuDetails = false;
      this.showNatureSaison = false;
      this.showHautmenu = false ;
      this.showBasmenu = false;
      this.PriceTotal =  +this.number_geuste * +this.ptDejPrice 
      this.remisePrice = this.PriceTotal;
     
      this.soda = 0;
      this.eau = 0;
      this.EauPrice = 0 ;
      this.sodaPrice = 0;
      const value = 'Petit déjeuner';
      this.service.getMenuByName(value).pipe(take(1)).subscribe((menu :any) => {
       console.log('menu id>>>',menu._id);
       
        this.menuID = menu._id;
        
    }
    )
    
    }else{
      this.isDisabled= false;
      this.MenuPrice1 = true;
      this.MenuPrice2 = false;
      // this.PriceTotal =  +this.number_geuste * +this.MenuPrice
       this.PriceTotal = 0;
      this.remisePrice = this.PriceTotal;
      this.menuPdj = false;
      this.menuSta = true;
      this.soda = 0;
      this.eau = 0;
      this.EauPrice = 0 ;
      this.sodaPrice = 0;
      this.showNatureSaison = true;
      this.showHautmenu = true ;
      this.MenuPrice = 0;
      
    }
    
  }






  resetChambre(event : MatSelectChange){
    if (event.value = "null") {
      this.reservationMenuEditForm.get('roomID').reset; 
    }

  }

 calculTotal(nombre_personnes : any , menuPrice : any ){

  this.PriceTotal = (menuPrice * nombre_personnes) 
  this.remisePrice = this.PriceTotal;
  this.reservationMenuEditForm.get('price').setValue(+this.PriceTotal);
 }


 re_calculTotal(event: any){
   this.number_geuste = event.target.value;
  

   if(this.menuSta){
    this.calculTotal(event.target.value  , this.MenuPrice);
 }else if (this.menuPdj){
    this.calculTotal(event.target.value  , this.ptDejPrice);
 }else{
  this.calculTotal(event.target.value  , this.MenuPrice);
 }

  
   
 }
 
 addToTotal(type :any){
  
     if(type === "Soda") {
     
        
        this.sodaPrice = this.sodaPrice + 2
     
        this.PriceTotal = +this.PriceTotal + 2
        this.remisePrice = this.PriceTotal;
        this.soda = this.soda + 1;
      
        }
     else if (type === "Eau") {
  
      this.EauPrice = this.EauPrice + 1
      this.PriceTotal = +this.PriceTotal + 1
      this.remisePrice = this.PriceTotal;
      this.eau = this.eau + 1;
    
    
   }
   
 }


 removeFromTotal(type :any){
  if (this.PriceTotal){
    if(type === "Soda") {
      this.PriceTotal = +this.PriceTotal - 2
      this.remisePrice = this.PriceTotal;
      this.sodaPrice = this.sodaPrice - 2
      this.soda = this.soda - 1;
     
    }
    else if (type === "Eau") {
    this.PriceTotal = +this.PriceTotal - 1
    this.remisePrice = this.PriceTotal;
     this.EauPrice = this.EauPrice - 1
     this.eau = this.eau - 1;
   }
  }
}



updateReservation(){

console.log('entresta>>>>',this.reservationMenuEditForm.get('entreSta').value);

  if(this.reservationMenuEditForm.get('entreSta').value === 'petit déjeuner'){
    const ObjectToEdit = {
      _id : this.modalData._id ,
      type:"menu",
      first_name :  this.reservationMenuEditForm.get('first_name').value,
      last_name : this.reservationMenuEditForm.get('last_name').value ,
      menuID :'61e1579908210d3cd49bb63f',
      number_phone: this.reservationMenuEditForm.get('number_phone').value ,
      number_heure: this.reservationMenuEditForm.get('number_heure').value ,
      startDate : formatDate(this.reservationMenuEditForm.get('startDate').value, 'yyyy-MM-dd', 'en'),
      number_guests : this.reservationMenuEditForm.get('number_guests').value ,
      comment : this.reservationMenuEditForm.get('comment').value ,
      status : this.reservationMenuEditForm.get('status').value ,
      price : +this.PriceTotal,
      typeRepas:this.reservationMenuEditForm.get('entreSta').value,
      nb_eau : this.eau,
      nb_soda: this.soda,
      remise : this.remisePrice
    }
  
    
    
    
    this.service.updateStandReservationMenu(this.modalData._id , ObjectToEdit).subscribe((data : any)=> {
   
      this.showNotification(
        'snackbar-success',
         "la réservation a été modifiée avec succès",
        'top',
        'end'
      );
      //this.dialog.closeAll()
      this.dialogRef.closeAll()
      this.getMenuReservations();
  
    } )
  }else{
      
  
    const ObjectToEdit = {
      _id : this.modalData._id ,
      type:"menu",
      first_name :  this.reservationMenuEditForm.get('first_name').value,
      last_name : this.reservationMenuEditForm.get('last_name').value ,
      menuID :`${this.menuID }` ,
      number_phone: this.reservationMenuEditForm.get('number_phone').value ,
      number_heure: this.reservationMenuEditForm.get('number_heure').value ,
      startDate : formatDate(this.reservationMenuEditForm.get('startDate').value, 'yyyy-MM-dd', 'en'),
      number_guests : this.reservationMenuEditForm.get('number_guests').value ,
      comment : this.reservationMenuEditForm.get('comment').value ,
      status : this.reservationMenuEditForm.get('status').value ,
      price : +this.PriceTotal,
      typeRepas:this.reservationMenuEditForm.get('entreSta').value,
      nb_eau : this.eau,
      nb_soda: this.soda,
      remise : this.remisePrice
    }
  

    
    
    this.service.updateStandReservationMenu(this.modalData._id , ObjectToEdit).subscribe((data : any)=> {
 
      this.showNotification(
        'snackbar-success',
         "la réservation a été modifiée avec succès",
        'top',
        'end'
      );
      //this.dialog.closeAll()
      this.dialogRef.closeAll()
      this.getMenuReservations();
  
    } );
  }


  
}

//////////////////////// end Menu Standar Task///////////////////////////////////







}

