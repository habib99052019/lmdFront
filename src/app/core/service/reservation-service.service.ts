import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  ApiPath = environment.API 


  constructor(private http : HttpClient) { 
    console.log(this.ApiPath)
  }

  
  getReservationList(){
    return this.http.get(this.ApiPath + 'reservations');
  }

  getRoomList() {
    return this.http.get(this.ApiPath + 'rooms');
  }

  //add new room reservation 
  addReservation(reservation : any){
  const url=this.ApiPath + 'reservations'
  console.log(url,'rrr')
  return this.http.post(this.ApiPath + 'reservations' , reservation);
  }

  getUserList(){
    return this.http.get(this.ApiPath + 'users' )
  }

  getReservation(id){
    return this.http.get(this.ApiPath + 'reservations/' + id)
  }

  getRoomById(id){
    return this.http.get(this.ApiPath + 'rooms/' + id);
  }
  getMenuById(id){
    return this.http.get(this.ApiPath + 'menus/' + id);
  }

  getUserById(id){
    return this.http.get(this.ApiPath + 'users/' + id);
  }

  deleteReservation(id){
    return this.http.delete(this.ApiPath + 'reservations/' + id)
  }

  getMenuList(){
    return this.http.get(this.ApiPath + 'menus' )
  }

  updateReservation(id , data){
    return this.http.put(this.ApiPath + 'reservations/' + id , data)
  }

  addMenuReservation(data){
    return this.http.post(this.ApiPath + 'reservations/menu' , data);
  }

  addPersoReservationMenu(data){
    return this.http.post(this.ApiPath + 'reservations/menu/perso' , data);

  }

  getListOfMenusReservation(){

    console.log( this.ApiPath ,"er")
    return this.http.get(this.ApiPath + 'reservations/menus')
  }

  /*update standard menu reservation */
  updateStandReservationMenu(id , data){
    return this.http.put(this.ApiPath + 'reservations/menusta/' + id , data)
  }
  
  /*update perso menu reservation */
  updatePersoReservationMenu(id , data){
    return this.http.put(this.ApiPath + 'reservations/menuperso/' + id , data)
  }

  /*delete perso reservation from room */
  
  deletePersoMenuReservation(id){
    return this.http.delete(this.ApiPath + 'reservations/menu/' + id)
  }

  /* delete menu */
  deleteMenu(id){
    return this.http.delete(this.ApiPath + '/menus/' + id)
  }

   /* get menu by name */
   getMenuByName(name){
    return this.http.get(this.ApiPath + '/menus/name?name=' + name)
  }

  /* get plats list by category */
  getPlatListByCategory(){
    return this.http.get(this.ApiPath + 'plats')
  }

/* get room totale price  */
  getRoomTotalPrice(id){
    return this.http.get(this.ApiPath + 'reservations/total/' + id);
  }

 /* get list of nature menus haut et bas saison */

 getListNatureMenus(){
  return this.http.get(this.ApiPath + 'menus/nature');
}

/* get one menu haut or bas saison */
getMenuByDescreption(name,saison){
  return this.http.get(this.ApiPath + '/menus/desc?name=' + name + '&saison=' + saison)
}

/* check room reservation */
checkRoomReservation(date){
  return this.http.get(this.ApiPath + 'reservations/check?date=' + date)
}

/* get standard room by name */
getStandardRoomByName(name){
  return this.http.get(this.ApiPath + '/rooms?name=' + name )
}

}
