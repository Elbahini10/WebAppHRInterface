import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServStagiairesService {

  readonly URL = "http://localhost:8080/api/stagiaires/"

  Stagiaires! : Array<any>
  constructor(private http : HttpClient) { }



  public Create_Stagiaires(data : any)
  {
    return this.http.post(this.URL+"CreateStagiaires",data).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme API Create Stagiaires"))
      })
    )
  }

  public find_all_Stagiaires() : Observable<any>
  {
    return this.http.get(this.URL+"data").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme API data Stagiaires"))
      })
    )
  }
  public find_all_School() : Observable<any>
  {
    return this.http.get(this.URL+"school").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme API data School"))
      })
    )
  }
  public find_trainner_by_departement(Mc : any) : Observable<any>
  {
    // alert("http://localhost:8080/api/stagiaires/data/Dep/"+Mc)
    return this.http.get("http://localhost:8080/api/stagiaires/data/Dep/"+Mc).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme API data trainee by departement "))
      })
    )
  }
  public find_trainner_by_id(id : number) : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/stagiaires/data/id/"+id).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme API data trainee by id "))
      })
    )
  }


  public getPageStagiaires(page: number, size: number): Observable<any> {
    return this.find_all_Stagiaires().pipe(
      map((data) => {
        this.Stagiaires = data
        let index = page * size
        let totalPage2 = Math.ceil(this.Stagiaires.length / size)
        let PageProduct = this.Stagiaires.slice(index, index + size)
        return { page: page, size: size, totalPage2: totalPage2, product: PageProduct }
      })
    )
  }



}
