import { Component, OnInit ,ViewChild ,ElementRef, TemplateRef} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationServiceService } from '../../core/service/reservation-service.service'
import {ChambreAddFormDialogComponent} from '../chambre-list/form-dialog/form-dialog.component'
import { MatPaginator } from '@angular/material/paginator';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {  MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-chambre-list',
  templateUrl: './chambre-list.component.html',
  styleUrls: ['./chambre-list.component.sass']
})
export class ChambreListComponent implements OnInit {
  
  @ViewChild('dateModal') dateModal : TemplateRef<any>;
  @ViewChild('editModal') editModal : TemplateRef<any>;
  displayedColumns = [
    'Client name',
    'Room name',
    'Start date',
    'End date',
    'Price',
    'Status',
    'actions',
  ];
   todayDate = new Date() ;
   RoomreservationList : any
   rooms : any 
   filterData: any;
   reservationData : any 
   pageNumber= 0;
   RoomPrice = 0; 
   minDate : any ;
   maxDate : any ;
   max_guests = 0;
   priceTotal = 0
   Days = 0 ;
   modalData : any;
  Chambre_list : any;
   reservationChambreForm: FormGroup;
  constructor(
    private service : ReservationServiceService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
    private fb: FormBuilder 
    ) { }
    @ViewChild(MatPaginator) paginator: MatPaginator;
    TableSourceData : MatTableDataSource<any> =  new MatTableDataSource
    
    filterForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
  });
  

  filterPeriod(value) {
    const fromDate = formatDate(value.fromDate  , 'yyyy-MM-dd' , 'en')
    const toDate = formatDate(value.toDate  , 'yyyy-MM-dd' , 'en')

    console.log(fromDate)
    console.log(toDate)

    this.TableSourceData.data = this.TableSourceData.data.filter( (e) => 
    formatDate(e.startDate , 'yyyy-MM-dd' , 'en') > fromDate && formatDate(e.endDate , 'yyyy-MM-dd' , 'en')  > toDate ||
    formatDate(e.startDate , 'yyyy-MM-dd' , 'en') < fromDate && formatDate(e.endDate , 'yyyy-MM-dd' , 'en')  < toDate 
    ) 
    this.filterForm.reset();
 
  }
  ngOnInit() {
  
    this.getRoomReservations();
    
  }
  ngAfterViewInit() {
    this.TableSourceData.paginator = this.paginator;
  }
  
get fromDate() { return this.filterForm.get('fromDate').value; }
get toDate() { return this.filterForm.get('toDate').value; }

 
  getRoomReservations(){
    this.service.getReservationList().subscribe((data : any ) => {
        this.RoomreservationList = data.filter(reservation => reservation.type === 'room');
        this.service.getRoomList().subscribe((rooms : any) =>{
          this.rooms = rooms.map(room => { return { name: room.name ,id: room._id}}); 
        this.service.getUserList().subscribe((users : any)=> {
          let mergedList = this.RoomreservationList.map(reservation => {
            let rooms = this.rooms.find(room => room.id === reservation.roomID)
            return { ...rooms, ...reservation}
              })  
           
              this.reservationData = mergedList.map(reservation => {
                let user = users.find(user => user._id === reservation.clientID)
                return {...user , ...reservation }
                  }) 
                  this.filterData = this.reservationData
                  this.TableSourceData.data = this.reservationData
             
              
         })
        })
    })
  }

addnew(){
  const dialogRef = this.dialog.open(ChambreAddFormDialogComponent);
  
  dialogRef.afterClosed().subscribe((result) => {
    if (result === 1) {
      window.location.reload();
    }
   
  })
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
        this.getRoomReservations();
      })
    }
  });
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
       reservation.status.trim().toLowerCase().includes(term.trim().toLowerCase()) 
    );
  }
}

openDatefiltre(){
  this.modalService.open( this.dateModal);
}

getRoomList() {
  this.service.getRoomList().subscribe((data : any)=>{
   this.Chambre_list = data
  })
}

showRoom(event : MatSelectChange){
  if (event.value.price){
    this.RoomPrice = event.value.price
  }
  this.calculTotal(this.Days , this.RoomPrice);
  this.max_guests = event.value.number_places;
  this.reservationChambreForm.get('roomID').setValue(event.value._id) 
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
  this.reservationChambreForm.get('price').setValue(roomPrice * days);
}


createContactForm(): FormGroup {
  return 
}
openEditModal(row){
  this.modalData = row;
  this.reservationChambreForm = this.fb.group({
    first_name : [ this.modalData.first_name , Validators.required],
    last_name : [this.modalData.last_name , Validators.required],
    roomID : [this.modalData.id , Validators.required],
    startDate : [this.modalData.startDate , Validators.required],
    endDate : [this.modalData.endDate , Validators.required],
    number_guests : [this.modalData.number_guests , Validators.required],
    number_children : [ this.modalData.number_children , Validators.required],
    comment : [this.modalData.comment ],
    extra : [this.modalData.extra ],
    price : [this.modalData.price , Validators.required],
  });

  this.modalService.open( this.editModal, {
  
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

}
