import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningServicesService {
  
  readonly URL = "http://localhost:8080/api/Planning/"


  constructor(private http : HttpClient) { }



  public Create_Planning(data : any)
  {
    return this.http.post(this.URL+"Add_Planning",data).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme API Create Planning"))
      })
    )
  }

}
