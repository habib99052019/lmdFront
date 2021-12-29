import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
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
    "Client",
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

  number_geuste:any;
  isUnderline = true;
  showview = true;
  editPersoMenuComponent:any;
  menuID:any;

////////////Start perso menus variables //////////////////




////////////end perso menus variables //////////////////






    TableSourceData : MatTableDataSource<any> =  new MatTableDataSource;
  //  TablePersoSourceData : MatTableDataSource<any> =  new MatTableDataSource
 // dataSource : MatTableDataSource<any> =  new MatTableDataSource;
 // dataSource2 : MatTableDataSource<any> =  new MatTableDataSource

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
}
  //@ViewChild('paginator') paginator: MatPaginator;
 // @ViewChild('paginator2') paginator2: MatPaginator;
  reservationMenuEditForm: FormGroup;
  modalData: any;
  Chambres: any;

  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog , 
    private service : ReservationServiceService ,
     private snackBar : MatSnackBar,
    private modalService : NgbModal,
    private changeDetectorRefs: ChangeDetectorRef,
    private dialogRef: MatDialog) {
      //this.dataSource1 = new MatTableDataSource<any>();
     // this.dataSource2 = new MatTableDataSource<any>();
    }


  onSubmit() {}

  ngOnInit() {
    this.getMenuReservations()
    this.getMenus();
    this.getRooms();
    //console.log('list reserbation menus>>>',this.TableSourceData.data);


    //////////////start init perso menus /////////////
   //  this.getlisPersoReervationMenus()
   
    //////////////start init perso menus /////////////

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
    this.service.getMenuList().subscribe((data : any)=>{
      console.log('menus from get menus>>>',data);
      
     this.Menus = data
    })
  }
  
  getRooms(){
    this.service.getRoomList().subscribe((data : any)=>{
      this.Chambres = data ;
    })
  }


search(term: string) {

  this.TableSourceData.data = this.filterData.filter(reservation => 
    reservation.clientID.first_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.clientID.last_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.clientID.number_phone.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.price.includes(term) ||  
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
 // this.showview = false
  this.isUnderline = false;
  console.log('showview',this.showview);
  //window.location.reload();
  console.log('paginator>>>',this.paginator);
}

changeStandardView(){
  this.showview = true
  this.isUnderline = true;
  this.editPersoMenuComponent = ''
  console.log('showview',this.showview);
 // window.location.reload();
 console.log('paginator>>>',this.paginator);
}




getMenuReservations(){
 

    this.service.getListOfMenusReservation().subscribe((menusReservation:any) => {
        console.log('menuReservation>>>', menusReservation);
             this.filterData = menusReservation
            this.TableSourceData.data = menusReservation
           //this.dataSource = menusReservation;
           // this.getMenuReservations()
          // this.changeDetectorRefs.detectChanges();
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
        console.log('resultata from add new>>>', result);
        
      if (result === 1) {
         window.location.reload();
      }
    });
 }



deleteSingleRow(row) {
  console.log('delete menu',row);
  Swal.fire({
    title: "êtes vous sure?",
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonColor: "#f44336",
    cancelButtonColor: "#96a2b4",
    confirmButtonText: "Oui",
  }).then((result) => {
    console.log(result)
    if (result.value) {
      this.service.deleteReservation(row._id).subscribe((data:any) => {
        console.log('delete >>>', data);
        

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

    console.log('row from edit modal>>>', row);
    
     
    this.modalData = row;
    if(this.modalData){
       this.number_geuste = this.modalData.number_guests;
    }

    if(this.modalData.menuID.name == 'Menu 1'){
     // this.showMenuDetails = true ; 
      this.MenuPrice = 150
     // this.calculTotal(this.number_geuste , this.MenuPrice );
    }else if(this.modalData.menuID.name == 'Menu 2'){
      //  this.showMenuDetails = true ; 
        this.MenuPrice = 80
        //this.calculTotal(this.number_geuste , this.MenuPrice );
    }else if(this.modalData.menuID.name == 'Menu 3'){
       // this.showMenuDetails = true ; 
        this.MenuPrice = 90
        //this.calculTotal(this.number_geuste , this.MenuPrice );
    }else{
       // this.showMenuDetails = true ; 
        this.MenuPrice = 120
       // this.calculTotal(this.number_geuste , this.MenuPrice );
    }


     console.log('mdale price >>>', this.modalData.price);
     

   
    this.PriceTotal = this.modalData.price;
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
      entreSta : [this.modalData.typeRepas]
    });

    this.dialog.open( this.editModal, {
          width:'1200px',
          height:'900px'
    });
  }


  closeModal(){
    this.dialog.closeAll()
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 3000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  


  showMenu(event : MatSelectChange){
    console.log('event from show menu >>>>', event.value);
    if(event.value == 'Menu 1'){
         this.entree = "Trio de salade";
         this.dessert = "Assiette de fruits de saison";
         this.suite = "Agneau à la gargoulette";
         this.showMenuDetails = true ; 
         this.MenuPrice = 150
         this.calculTotal(this.number_geuste , this.MenuPrice );
    }else if(event.value == 'Menu 2'){
        this.entree = "Trio de salade";
        this.dessert = "Assiette de fruits de saison";
        this.suite = "grillade mixte";
        this.showMenuDetails = true ; 
        this.MenuPrice = 80
        this.calculTotal(this.number_geuste , this.MenuPrice );
    }else if(event.value == 'Menu 3'){
        this.entree = "Trio de salade";
        this.dessert = "Assiette de fruits de saison";
        this.suite = "Poisson grillé";
        this.showMenuDetails = true ; 
        this.MenuPrice = 90
        this.calculTotal(this.number_geuste , this.MenuPrice );
    }else{
        this.entree = "Trio de salade";
        this.dessert = "Assiette de fruits de saison";
        this.suite = "couscous à l'agneau";
        this.showMenuDetails = true ; 
        this.MenuPrice = 120
        this.calculTotal(this.number_geuste , this.MenuPrice );
    }



    /*
    this.entree = event.value.entree;
    this.dessert = event.value.dessert;
    this.suite = event.value.suite;
    this.showMenuDetails = true ; 
    if (event.value.price){
      this.MenuPrice = event.value.price
    }
    this.reservationMenuEditForm.get('menuID').setValue(event.value._id) 
    this.calculTotal(this.reservationMenuEditForm.get('number_guests').value  , this.MenuPrice );
    */
  }

  resetChambre(event : MatSelectChange){
    if (event.value = "null") {
      this.reservationMenuEditForm.get('roomID').reset; 
    }

  }

 calculTotal(nombre_personnes : any , menuPrice : any ){

  this.PriceTotal = (menuPrice * nombre_personnes) 
  this.reservationMenuEditForm.get('price').setValue(this.PriceTotal);
 }


 re_calculTotal(event: any){
   this.number_geuste = event.target.value;
   console.log('number of personne>>>',event.target.value);
   this.calculTotal(event.target.value  , this.MenuPrice );
  /*
   if (this.MenuPrice){
    this.calculTotal(event.target.value  , this.MenuPrice );
   }
   else {
     //get list of menus from backend
    this.service.getMenuById(this.reservationMenuEditForm.get("menuID").value).subscribe((data : any)=>{
        this.PriceTotal = data.price * event.target.value
    })
   }
    */
   
 }
 
 addToTotal(type :any){
   if (this.PriceTotal){
     if(type === "Soda") {
        this.sodaPrice = this.sodaPrice + 2
        
        
        this.PriceTotal = this.PriceTotal + 2
        console.log('price totale>>>',this.PriceTotal);
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

verifyMenuID(menuName:string){
  if(menuName == "Menu 1"){
      this.menuID = "61c3178da5277719d47cfc13";
  }else if(menuName == "Menu 2"){
      this.menuID = "61c3175937bead3524b19243";
  }else if( menuName == "Menu 3"){
     this.menuID = "61c3170a86695a371c246c08";
  }else{
    this.menuID = "61c3169d00e12d508cf590a7";
  }
}

updateReservation(){
  this.verifyMenuID(this.reservationMenuEditForm.get('menuID').value);
  const ObjectToEdit = {
    _id : this.modalData._id ,
    type:"menu",
    first_name :  this.reservationMenuEditForm.get('first_name').value,
    last_name : this.reservationMenuEditForm.get('last_name').value ,
    menuID :this.menuID ,
    number_phone: this.reservationMenuEditForm.get('number_phone').value ,
    number_heure: this.reservationMenuEditForm.get('number_heure').value ,
    startDate : formatDate(this.reservationMenuEditForm.get('startDate').value, 'yyyy-MM-dd', 'en'),
    number_guests : this.reservationMenuEditForm.get('number_guests').value ,
    comment : this.reservationMenuEditForm.get('comment').value ,
    status : this.reservationMenuEditForm.get('status').value ,
    price : this.PriceTotal,
    typeRepas:this.reservationMenuEditForm.get('entreSta').value
  }

  console.log('object to edit>>>',ObjectToEdit);
  
  
  this.service.updateStandReservationMenu(this.modalData._id , ObjectToEdit).subscribe((data : any)=> {
    console.log(data)
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

//////////////////////// end Menu Standar Task///////////////////////////////////







}

