import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemboursementServicesService {

  // readonly URL_API = "http://localhost:8080/api/Remboursement/"

  constructor(private http : HttpClient) { }


  // public Add_Destination(data : any)
  // {
  //   return this.http.post("http://localhost:8080/api/Remboursement/AddDestination",data).pipe(
  //     catchError((err) => {
  //       return throwError(()=> new Error(err + "Probleme Api For Create Destination ! "))
  //     })
  //   )
  // }
  public Add_remboursement(data : any)
  {
    return this.http.post("http://localhost:8080/api/Remboursement/AddRemboursement",data).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Create remboursement ! "))
      })
    )
  }
  public find_destination() : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Remboursement/destination").pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For get Destination ! "))
      })
    )
  }
  public check_destination(Mc : String) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Remboursement/destination/"+Mc).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Check Destination ! "))
      })
    )
  }
  public get_all_by_month_and_destination(Mc1 : String,Mc2 : String) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Remboursement/List/"+Mc1+"/"+Mc2).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Check Destination ! "))
      })
    )
  }
  public get_total_rembourcement_by_id(Mc : any , Mc2 : String) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Remboursement/ListTotal/"+Mc+"/"+Mc2).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + ""))
      })
    )
  }
  public get_total_rembourcement_by_month(Mc : any ) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Remboursement/ListTotal/"+Mc).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + ""))
      })
    )
  }


}
