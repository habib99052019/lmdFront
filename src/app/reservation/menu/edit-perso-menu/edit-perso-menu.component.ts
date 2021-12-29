import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ReservationServiceService } from 'src/app/core/service/reservation-service.service';
import Swal from 'sweetalert2';
import { EditFormDialogComponent } from './edit-form-dialog/edit-form-dialog.component';

@Component({
  selector: 'app-edit-perso-menu',
  templateUrl: './edit-perso-menu.component.html',
  styleUrls: ['./edit-perso-menu.component.sass']
})
export class EditPersoMenuComponent implements OnInit {


  displayedColumns = [
    "startDate",
    "name",
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
    reservation.listmenuID[0].typeRepas.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
    reservation.status_reservation.trim().toLowerCase().includes(term.trim().toLowerCase()) ||
    reservation.roomName.trim().toLowerCase().includes(term.trim().toLowerCase()) 
  
    )
}
  


 getlisPersoReervationMenus(){
  
    this.service.getReservationList().subscribe((persoMenus:any) => {
      //this.filterData = persoMenus 
      
      console.log('list of perso menus >>>',persoMenus );
     
      const persoMenusActive = persoMenus.filter(list => {
         return list.listmenuID.length > 0 ;
      })
      this.DataPersoMenu.data= persoMenusActive;
      console.log('persoMenusActive>>>', persoMenusActive);
      this.filterData = persoMenusActive
      
    })
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
      this.service.deletePersoMenuReservation(row._id).subscribe((data:any) => {
        console.log('delete >>>', data);
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

  console.log('row from edit perso page>>>', row);
  if(row.listmenuID[1] && row.listmenuID[0] ){
        
    const dialogRef = this.dialog.open(EditFormDialogComponent, {

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
        menuListTosent: [],
        menuID:row.listmenuID[0]._id,
 
        menu2ListTosent:[],
        repasType2: row.listmenuID[1].typeRepas,
        comment2: row.listmenuID[1].comment,
        price2: row.listmenuID[1].price,
        menu2List: row.listmenuID[1].menuList,
        menuID2:row.listmenuID[1]._id
     }
   });
 
    dialogRef.afterClosed().subscribe(result => {
     console.log('lenght>>>', result.menuListTosent.length);
 
       if((result.menuListTosent.length != 0 ) && (result != undefined)){
           console.log('result from edit>>>', result);
           const datatosent = {
                 menuList:result.menuList,
                 comment:result.comment,
                 isPersonalize:true,
                 price:result.price,
                 entrePerso:result.repasType
           }
           this.service.updatePersoReservationMenu(result.menuID,datatosent).subscribe(perso => {
             console.log('perso updated>>>>', perso);
             
             this.showNotification(
               'snackbar-success',
               "la réservation a été modifier avec succès",
               'top',
               'end'
             );
              this.getlisPersoReervationMenus();
           }, err => {
               
             if(err != 'Not Found'){
               console.log('err>>>',err);
                 this.showNotification(
                 'snackbar-danger',
                   err,
                 'top',
                 'end'
               );
            }
                 })
         
       }else{
         console.log('result from edit>>>', result);
         const datatosent = {
               menuList:result.menu2List,
               comment:result.comment2,
               isPersonalize:true,
               price:result.price2,
               entrePerso:result.repasType2
         }
         this.service.updatePersoReservationMenu(result.menuID2,datatosent).subscribe(perso => {
           console.log('perso updated>>>>', perso);
           
           this.showNotification(
             'snackbar-success',
             "la réservation a été modifier avec succès",
             'top',
             'end'
           );
            this.getlisPersoReervationMenus();
         }, err => {
             
           if(err != 'Not Found'){
             console.log('err>>>',err);
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
        menuListTosent: [],
        menuID:row.listmenuID[0]._id,
        
      /*  menu2ListTosent:[],
        repasType2: row.listmenuID[1].typeRepas,
        comment2: row.listmenuID[1].comment,
        price2: row.listmenuID[1].price,
        menu2List: row.listmenuID[1].menuList,
        menuID2:row.listmenuID[1]._id*/
     }
   });
 
    dialogRef.afterClosed().subscribe(result => {
     console.log('lenght>>>', result.menuListTosent.length);
 
       if((result.menuListTosent.length != 0 ) && (result != undefined)){
           console.log('result from edit>>>', result);
           const datatosent = {
                 menuList:result.menuList,
                 comment:result.comment,
                 isPersonalize:true,
                 price:result.price,
                 entrePerso:result.repasType
           }
           this.service.updatePersoReservationMenu(result.menuID,datatosent).subscribe(perso => {
             console.log('perso updated>>>>', perso);
             
             this.showNotification(
               'snackbar-success',
               "la réservation a été modifier avec succès",
               'top',
               'end'
             );
              this.getlisPersoReervationMenus();
           }, err => {
               
             if(err != 'Not Found'){
               console.log('err>>>',err);
                 this.showNotification(
                 'snackbar-danger',
                   err,
                 'top',
                 'end'
               );
            }
                 })
         
       }else{
         console.log('result from edit>>>', result);
         const datatosent = {
               menuList:result.menu2List,
               comment:result.comment2,
               isPersonalize:true,
               price:result.price2,
               entrePerso:result.repasType2
         }
         this.service.updatePersoReservationMenu(result.menuID2,datatosent).subscribe(perso => {
           console.log('perso updated>>>>', perso);
           
           this.showNotification(
             'snackbar-success',
             "la réservation a été modifier avec succès",
             'top',
             'end'
           );
            this.getlisPersoReervationMenus();
         }, err => {
             
           if(err != 'Not Found'){
             console.log('err>>>',err);
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

}
