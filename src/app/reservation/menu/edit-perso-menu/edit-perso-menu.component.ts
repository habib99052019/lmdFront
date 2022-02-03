
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import Swal from 'sweetalert2';
import { AddPersoMenuComponent } from '../add-perso-menu/add-perso-menu.component';
import { EditFormDialogComponent } from './edit-form-dialog/edit-form-dialog.component';

@Component({
  selector: 'app-edit-perso-menu',
  templateUrl: './edit-perso-menu.component.html',
  styleUrls: ['./edit-perso-menu.component.css']
})
export class EditPersoMenuComponent implements OnInit {


  displayedColumns = [
    "startDate",
    "name",
    "Heure",
    "Client",
    "RoomName",
    "price",
    "status",
    "Actions",
  ];
  
  filterData:any;
  
  DataPersoMenu: MatTableDataSource<any> =  new MatTableDataSource;
 

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
}
  constructor(
    private fb: FormBuilder, 
    public dialog: MatDialog , 
    private service : ReservationServiceService ,
     private snackBar : MatSnackBar,
  
  ) { }

  ngOnInit(): void {
    this.getlisPersoReervationMenus()
   
    
  }

  

  ngAfterViewInit() {

    
    this.DataPersoMenu.paginator = this.paginator;
  
  }


  setDataSourceAttributes() {
    this.DataPersoMenu.paginator = this.paginator;
   // this.TableSourceData.sort = this.sort;

    if (this.paginator) {
       //this.applyFilter('');
    }
}


search(term: string) {

  this.DataPersoMenu.data = this.filterData.filter(reservation => 
 
    
   
    reservation.clientID.first_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.clientID.last_name.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.clientID.number_phone.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.listmenuID[0].number_heure.trim().toLowerCase().includes(term.trim().toLowerCase()) || 
    reservation.listmenuID[0].typeRepas.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
    reservation.status_reservation.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
    reservation.roomName.trim().toLowerCase().includes(term.trim().toLowerCase()) 

    )
}
  


 getlisPersoReervationMenus(){
  
    this.service.getReservationList().pipe(take(1)).subscribe((persoMenus:any) => {
     
      
      
     
      const persoMenusActive = persoMenus.filter(list => {
         return list.listmenuID.length > 0 ;
      })
      this.DataPersoMenu.data= persoMenusActive;
      
      this.filterData = persoMenusActive
      
    })
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
      this.service.deletePersoMenuReservation(row._id).subscribe((data:any) => {
        
        this.showNotification(
          'snackbar-danger',
           "la réservation a été supprimée avec succès",
          'top',
          'end'
        );
        this.getlisPersoReervationMenus();
      })
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


openEditModal(row){


  
  
  if(row.listmenuID[1] && row.listmenuID[0]){
  
    const dialogRef = this.dialog.open(EditFormDialogComponent, {
      disableClose: true, 
      width:'1000px',
      height:'800px',
     
      
     data:{
        first_name: row.clientID.first_name,
        last_name: row.clientID.last_name,
        roomName: row.roomName,
        repasType: row.listmenuID[0].typeRepas,
        comment: row.listmenuID[0].comment,
        price: row.listmenuID[0].price,
        menuList: row.listmenuID[0].menuList,
        remise: row.listmenuID[0].remise,
        menuListTosent: [],
        menuID:row.listmenuID[0]._id,
        number_heure: row.listmenuID[0].number_heure,

        menu2ListTosent:[],
        repasType2: row.listmenuID[1].typeRepas,
        comment2: row.listmenuID[1].comment,
        price2: row.listmenuID[1].price,
        menu2List: row.listmenuID[1].menuList,
        menuID2:row.listmenuID[1]._id,
        number_heure2: row.listmenuID[1].number_heure,
        remise2: row.listmenuID[1].remise,
        check: 0
     }
   });
 
    dialogRef.afterClosed().subscribe(result => {
      this.getlisPersoReervationMenus();
   
      if(result == ""){
        return -1 ;
      }

 
       if((result[2] == 1) && (result != undefined)){
         
           
           const datatosent = {
                 menuList:result[5],
                 comment:result[0],
                 isPersonalize:true,
                 price:result[6],
                 entrePerso:result[1],
                 number_heure:result[3],
                 remise:result[8]
           }
           this.service.updatePersoReservationMenu(result[7],datatosent).subscribe(perso => {
            
             
             this.showNotification(
               'snackbar-success',
               "la réservation a été modifier avec succès",
               'top',
               'end'
             );
              this.getlisPersoReervationMenus();
           }, err => {
               
             if(err != 'Not Found'){
             
                 this.showNotification(
                 'snackbar-danger',
                   err,
                 'top',
                 'end'
               );
            }
                 })
         
       }
       
       
       else{
       
         const datatosent = {
          menuList:result[5],
          comment:result[0],
          isPersonalize:true,
          price:result[6],
          entrePerso:result[1],
          number_heure:result[3],
          remise:result[8]
         }
         this.service.updatePersoReservationMenu(result[7],datatosent).subscribe(perso => {
      
           
           this.showNotification(
             'snackbar-success',
             "la réservation a été modifier avec succès",
             'top',
             'end'
           );
            this.getlisPersoReervationMenus();
         }, err => {
             
           if(err != 'Not Found'){
          
               this.showNotification(
               'snackbar-danger',
                 err,
               'top',
               'end'
             );
          }
               })
       }
     
    })
     
  }else{
   
    const dialogRef = this.dialog.open(EditFormDialogComponent, {
      disableClose: true,
      width:'1000px',
      height:'800px',
     
      
     data:{
        first_name: row.clientID.first_name,
        last_name: row.clientID.last_name,
        roomName: row.roomName,
        repasType: row.listmenuID[0].typeRepas,
        comment: row.listmenuID[0].comment,
        price: row.listmenuID[0].price,
        remise: row.listmenuID[0].remise,
        menuList: row.listmenuID[0].menuList,
        menuListTosent: [],
        menuID:row.listmenuID[0]._id,
        number_heure: row.listmenuID[0].number_heure,
       
     }
   });
 
    dialogRef.afterClosed().subscribe(result => {
      this.getlisPersoReervationMenus();
      
      if(result == ""){
        return -1 ;
      }
 
       if((result[2] == 1) && (result != undefined) ){
          
           const datatosent = {
            menuList:result[5],
            comment:result[0],
            isPersonalize:true,
            price:result[6],
            entrePerso:result[1],
            number_heure:result[3],
            remise:result[8]
           }
           this.service.updatePersoReservationMenu(result[7],datatosent).subscribe(perso => {
           
             
             this.showNotification(
               'snackbar-success',
               "la réservation a été modifier avec succès",
               'top',
               'end'
             );
              this.getlisPersoReervationMenus();
           }, err => {
               
             if(err != 'Not Found'){
             
                 this.showNotification(
                 'snackbar-danger',
                   err,
                 'top',
                 'end'
               );
            }
                 })
         
       }else{
         
         const datatosent = {
          menuList:result[5],
          comment:result[0],
          isPersonalize:true,
          price:result[6],
          entrePerso:result[1],
          number_heure:result[3],
          remise:result[8]
         }
         this.service.updatePersoReservationMenu(result[7],datatosent).subscribe(perso => {
           
           
           this.showNotification(
             'snackbar-success',
             "la réservation a été modifier avec succès",
             'top',
             'end'
           );
            this.getlisPersoReervationMenus();
         }, err => {
             
           if(err != 'Not Found'){
          
               this.showNotification(
               'snackbar-danger',
                 err,
               'top',
               'end'
             );
          }
               })
       }
     
    })
  }
  
    








}



addPersoMenu(){

  let tempDirection;
  if (localStorage.getItem("isRtl") === "true") {
    tempDirection = "rtl";
  } else {
    tempDirection = "ltr";
  }
  const dialogRef = this.dialog.open(AddPersoMenuComponent, {
    disableClose: true,
    
     width:'1000px',
     height:'600px',
     data: {
      reservationMenu: null,
      action: "add",
    },
    direction: tempDirection,
  
  })

  dialogRef.afterClosed().subscribe(result => {
  
    this.getlisPersoReervationMenus();
    if (result === 1) {
    
      this.getlisPersoReervationMenus();
   }
      
  })
  
}

}
