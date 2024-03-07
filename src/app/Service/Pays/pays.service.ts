import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  readonly URL = "https://restcountries.com/v3.1/all"
  constructor(private http : HttpClient) { }

  public get_pays() : Observable<any>
  {
    return this.http.get(this.URL).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Country! "))
      })
    )
  }

}
