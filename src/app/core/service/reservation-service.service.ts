import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  ApiPath = environment.API 


  constructor(private http : HttpClient) { }

  
  getReservationList(){
    return this.http.get(this.ApiPath + 'reservations');
  }

  getRoomList() {
    return this.http.get(this.ApiPath + 'rooms');
  }

  //add new room reservation 
  addReservation(reservation : any){
   return this.http.post(this.ApiPath + 'reservations' , reservation);
  }

  getUserList(){
    return this.http.get(this.ApiPath + 'users' )
  }

  getReservation(id ){
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

}
