import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from "@angular/core";
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
  //Menus : any
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

  //liste de menus
  Menus = [
    {
        "_id": "615de00b5f8924312bf7b297",
        "name": "Menu 1",
        "entrée": "Trio de salade",
        "suite": "Agneau à la gargoulette",
        "dessert": "Assiette de fruits de saison",
        "price": "150",
        "tarif": "simple"
    },
    {
        "_id": "615de0b75f8924312bf7b298",
        "name": "Menu 2",
        "entrée": "Trio de salade",
        "suite": "grillade mixte",
        "dessert": "Assiette de fruits de saison",
        "price": "80",
        "tarif": "simple"
    },
    {
        "_id": "615de0f55f8924312bf7b299",
        "name": "Menu 3",
        "entrée": "Trio de salade",
        "suite": "Poisson grillé",
        "dessert": "Assiette de fruits de saison",
        "price": "90",
        "tarif": "simple"
    },
    {
        "_id": "615de1365f8924312bf7b29a",
        "name": "Menu 4",
        "entrée": "Trio de salade",
        "suite": "couscous à l'agneau",
        "dessert": "Assiette de fruits de saison",
        "price": "120",
        "tarif": "simple"
    }
]

    TableSourceData : MatTableDataSource<any> =  new MatTableDataSource
    @ViewChild(MatPaginator) paginator: MatPaginator;
  reservationMenuEditForm: FormGroup;
  modalData: any;
  Chambres: any;

  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog , 
    private service : ReservationServiceService ,
     private snackBar : MatSnackBar,
    private modalService : NgbModal) {}
  onSubmit() {}

  ngOnInit() {
    this.getMenuReservations()
    this.getMenus();
    this.getRooms();
  }

  ngAfterViewInit() {
    this.TableSourceData.paginator = this.paginator;
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


search(term: string) {
    if(!term) {
      this.TableSourceData.data =  this.filterData 
    } else {
      this.TableSourceData.data = this.filterData.filter(reservation => 
         reservation.first_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
         reservation.last_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
         reservation.name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
         reservation.price.includes(term) ||  
         reservation.RoomName.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
         reservation.status.trim().toLowerCase().includes(term.trim().toLowerCase()) 
      );
    }
}
  

getMenuReservations(){
    this.service.getReservationList().subscribe((data : any ) => {
        this.MenuReservationsList = data.filter(reservation => reservation.type === 'menu');
        this.service.getMenuList().subscribe((menus : any) =>{
          this.menus = menus.map(menu => { return { name: menu.name ,id: menu._id , menuPrice : menu.price} }); 
        this.service.getUserList().subscribe((users : any)=> {
          this.service.getRoomList().subscribe((rooms : any) => {
            this.rooms = rooms.map(room => { return { RoomName: room.name ,roomID: room._id}}); 

            let mergedList = this.MenuReservationsList.map(reservation => {
              let menus = this.menus.find(menu => menu.id === reservation.menuID)
              return { ...menus, ...reservation}
                })  
                let otherMergedList = mergedList.map(reservation => {
                  let room = this.rooms.find(room => room.roomID === reservation.roomID)
                  return { ...room, ...reservation}
                    })  

                this.reservationData = otherMergedList.map(reservation => {
                  let user = users.find(user => user._id === reservation.clientID)
                  return {...user , ...reservation }
                    }) 
                    this.filterData = this.reservationData
                    this.TableSourceData.data = this.reservationData
                    console.log(this.TableSourceData)


          })  
         })
        })
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
      height:'600px',
      data: {
        reservationMenu: null,
        action: "add",
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        //window.location.reload();
      }
    });
 }



deleteSingleRow(row) {
  console.log(row);
  Swal.fire({
    title: "Es-tu sûr?",
    showCancelButton: true,
    cancelButtonText: "Annuler",
    confirmButtonColor: "#f44336",
    cancelButtonColor: "#96a2b4",
    confirmButtonText: "Oui",
  }).then((result) => {
    console.log(result)
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
    
    this.modalData = row;
    this.PriceTotal = this.modalData.price;
    this.reservationMenuEditForm = this.fb.group({
      _id : [this.modalData._id ],
      first_name : [ {value : this.modalData.first_name , disabled : true} ],
      last_name : [ {value : this.modalData.last_name , disabled : true} ],
      roomID : [this.modalData.roomID , Validators.required],
      menuID : [this.modalData.menuID ],
      startDate : [this.modalData.startDate , Validators.required],
      number_guests : [this.modalData.number_guests , Validators.required],
      comment : [this.modalData.comment ],
      status : [this.modalData.status ],
      price : [this.modalData.price , Validators.required]
    });

    this.dialog.open( this.editModal, {
  
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
    this.entree = event.value.entrée;
    this.dessert = event.value.dessert;
    this.suite = event.value.suite;
    this.showMenuDetails = true ; 
    if (event.value.price){
      this.MenuPrice = event.value.price
    }
    this.reservationMenuEditForm.get('menuID').setValue(event.value._id) 
    this.calculTotal(this.reservationMenuEditForm.get('number_guests').value  , this.MenuPrice );
    
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
   if (this.MenuPrice){
    this.calculTotal(event.target.value  , this.MenuPrice );
   }
   else {
     //get list of menus from backend
    this.service.getMenuById(this.reservationMenuEditForm.get("menuID").value).subscribe((data : any)=>{
        this.PriceTotal = data.price * event.target.value
    })
   }
    
   
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

updateReservation(){
  const ObjectToEdit = {
    _id : this.modalData._id ,
    first_name :  this.modalData.first_name,
    last_name :this.modalData.last_name ,
    roomID : this.reservationMenuEditForm.get('roomID').value ,
    menuID : this.reservationMenuEditForm.get('menuID').value ,
    startDate : this.reservationMenuEditForm.get('startDate').value ,
    number_guests : this.reservationMenuEditForm.get('number_guests').value ,
    comment : this.reservationMenuEditForm.get('comment').value ,
    status : this.reservationMenuEditForm.get('status').value ,
    price : this.PriceTotal
  }
  this.service.updateReservation(this.modalData._id , ObjectToEdit).subscribe((data : any)=> {
    console.log(data)
    this.showNotification(
      'snackbar-success',
       "la réservation a été modifiée avec succès",
      'top',
      'end'
    );
    this.dialog.closeAll()
    this.getMenuReservations();

  } );
}

}

