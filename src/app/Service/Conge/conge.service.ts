import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongeService {
  // readonly URL 

  Btn_Add_Recuperation : boolean = false
  id! : number


  
  constructor(private http : HttpClient) { }

  public Create_Conge(data : any)
  {
    return this.http.post("http://localhost:8080/api/conge/AddConge",data).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Create Employeur ! "))
      })
    )
  }
  public find_all_conge() : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/ListConge").pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Conge ! "))
      })
    )
  }
  public find_cong_recup_by_id_employeur(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/Employeur/recup/"+id).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Conge Recuperation By Id Emploeyeur  ! "))
      })
    )
  }
  public find_conge_annuel_by_id_employeur(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/Employeur/annuel/"+id).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Conge Annuel By Id Emploeyeur  ! "))
      })
    )
  }
  public find_total_recup_conge_by_id(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/TotalConge/Recup/"+id).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Conge Total Recup By Id Emploeyeur  ! "))
      })
    )
  }
  public find_total_annuel_conge_by_id(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/TotalConge/annuel/"+id).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Conge Total Annuel By Id Emploeyeur  ! "))
      })
    )
  }
  public find_day_recupe_by_id(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/DayRecupe/"+id).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Day Recupe By Id Emploeyeur  ! "))
      })
    )
  }
  public find_total_recup_prendre_conge_by_id(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/conge/TotalConge/RecupPrendre/"+id).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Get Total days  ! "))
      })
    )
  }


}
