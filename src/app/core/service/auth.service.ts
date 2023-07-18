import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { URL } from 'url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient , private router:Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
   
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    environment.API="https://www.heart-of-carthage-dubai.com/"
    const url ="https://www.heart-of-carthage-dubai.com/auth/login/"
    console.log(url ,"rr")
   
    return this.http
      .post<any>(url, {
        username,
        password,
      })
      .pipe(

        map((user) => {
          console.log(user.valueOf() ,"&&&&")
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out

    
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isRtl');
    this.currentUserSubject.next(null);
    this.router.navigate(['/authentication/signin'])

    return of({ success: false });
  }
}
