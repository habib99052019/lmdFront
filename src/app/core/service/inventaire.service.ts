import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InventaireService {
  constructor(private readonly http: HttpClient) {}

  
  public getInventaires(): Observable<any> {
    return this.http.get(`${environment.API}${"inventaires"}`).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
        return [];
      })
    );
  }


  public getInventaire(id: string): Observable<boolean> {
    return this.http
      .get(
        `${environment.API}${"inventaires/:id"}`.replace(":id", id.toString())
      )
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
          return null;
        })
      );
  }


  public addInventaire(inventaire: any): Observable<any> {
    let body = {
      inventaire,
    };
    return this.http.post(`${environment.API}${"inventaires"}`, body).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
        return null;
      })
    );
  }


  public updateInventaire(id: string, inventaire: any): Observable<boolean> {
    return this.http
      .put(
        `${environment.API}${"inventaires/:id"}`.replace(":id", id.toString()),
        inventaire
      )
      .pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
          return false;
        })
      );
  }


  public removeInventaire(id: string): Observable<boolean> {
    return this.http
      .delete(
        `${environment.API}${"inventaires/:id"}`.replace(":id", id.toString())
      )
      .pipe(
        map((response: any) => {
          if (response) {
            return true;
          }
          return false;
        })
      );
  }


}