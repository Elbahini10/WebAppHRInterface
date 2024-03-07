import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, map, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeurServiceService {

  readonly URL = "http://localhost:8080/api/AddEmployeur"
  readonly URL_GLOBAL = "http://localhost:8080/api/"
  readonly URL_GET = "http://localhost:8080/api/Employeur"

  Id_Employeur! : number
  Btn_Show_Profile : boolean = false
  Btn_Delete : boolean = false
  Btn_Update_Profile : boolean = false
  Btn_Data_Not_Found : boolean = false

  Employeur! : Array<any>
  id_employe! : number

  constructor(private http : HttpClient) { }


  private apiUrl = 'http://votre-serveur/api/upload';

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post(this.apiUrl, formData);
  }

  public Create_Employeur(data : any)
  {
    return this.http.post(this.URL,data).pipe(
      catchError((err) => {
        return throwError(()=> new Error(err + "Probleme Api For Create Employeur ! "))
      })
    )
  }

  public Get_All_Employeur() : Observable<any>
  {
    return this.http.get(this.URL_GET).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Employeur ! "))
      })
      )
    }
    public Get_All_Employeur_By_Id(id : number) : Observable<any>
    {
      this.Id_Employeur = id
      // alert(this.URL_GET+"/"+this.Id_Employeur)
    return this.http.get(this.URL_GET+"/"+this.Id_Employeur).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Employeur by Id ! "))
      })
    )
  }

  public Delete_Employe_By_Id(id : number)
  {
    return this.http.delete(this.URL_GET+"/"+id).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Delete data Employeur by Id ! "))
      })
    )
  }
  public get_departement() : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/department").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Department ! "))
      })
    )
  }
  public get_etat() : Observable<any>
  {
    return this.http.get(this.URL_GLOBAL+'etat').pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Etat ! "))
      })
    )
  }
  public get_services(Mc : String) : Observable<any>
  {
    return this.http.get(this.URL_GLOBAL+'services/'+Mc).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Services ! "))
      })
    )
  }

  public get_employeur_by_search(Mc : String) : Observable<any>
  {
    return this.http.get(this.URL_GET+'/Search='+Mc).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Search ! "))
      })
    )
  }
  public get_employeur_by_filtre(Mc1 : String,Mc2 : String , Mc3 : String) : Observable<any>
  {
    return this.http.get(this.URL_GET+'/'+Mc1+'/'+Mc2+'/'+Mc3).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data filtre ! "))
      })
    )
  }
  public get_total_employeur() : Observable<any>
  {
    return this.http.get(this.URL_GET+'/Total').pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data Total ! "))
      })
    )
  }

  public getPageEmployeur(page: number, size: number): Observable<any> {
    return this.Get_All_Employeur().pipe(
      map((data) => {
        this.Employeur = data
        let index = ~~page * size
        let totalPage2 = Math.ceil(this.Employeur.length / size)
        let PageProduct = this.Employeur.slice(index, index + size)
        return { page: page, size: size, totalPage2: totalPage2, product: PageProduct }
      })
    )
  }

  public get_employeur_by_departement(Mc : String) : Observable<any>
  {
    return this.http.get(this.URL_GET+'/EmployeurByDepartement/'+Mc).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data employeur by departement ! "))
      })
    )
  }


  public find_Employe_By_registration_number(Mat : String) : Observable<any>
  {
    return this.http.get(this.URL_GLOBAL+'Matricule/'+Mat).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Get data Employeur by Matricule ! "))
      })
    )

  }


  public get_employeur_order_by_desc() : Observable<any>
  {
    return this.http.get(this.URL_GLOBAL+"EmployeurDesc").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Get data Employeur Order By DESC ! "))
      })
    )

  }

  public get_employeur_order_by_asc() : Observable<any>
  {
    return this.http.get(this.URL_GLOBAL+"EmployeurAsc").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Get data Employeur Order By Asc ! "))
      })
    )

  }
  public check_mat_if_exist(mat : number) : Observable<any>
  {
    return this.http.get(this.URL_GLOBAL+"Mat/"+mat).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Get Matricule "))
      })
    )

  }
  public check_cin_if_exist(cin : number) : Observable<any>
  {
    // alert("http://localhost:8080/api/Check_Cin/"+cin)
    return this.http.get("http://localhost:8080/api/Check_Cin/"+cin).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Get CIN "))
      })
    )

  }
  public Update_Employeur_By_Id(id : number, data : any ) : Observable<any>
  {
    // alert("http://localhost:8080/api/UpdateEmployeur/id="+id)
    return this.http.put("http://localhost:8080/api/Update/id="+id,data).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api Update Employeur "))
      })
    )

  }

  public get_employeur_by_filtre2(Mc1 : String,Mc2 : String) : Observable<any>
  {
    // alert("http://localhost:8080/api/Employeur/"+Mc1+"/"+Mc2)
    return this.http.get("http://localhost:8080/api/Employeur/"+Mc1+"/"+Mc2).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api get data filtre 2 ! "))
      })
    )
  }


  public find_employeur_by_id(id : number)  : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Employeur/"+id).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api data by id  ! "))
      })
    )
  }

  public check_mat(mat : any)  : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/Check_Mat/"+mat).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api For check Matricule  ! "))
      })
    )
  }
  public find_total_employe_by_departement()  : Observable<any>
  {
    return this.http.get("http://localhost:8080/api/TotalEmployeDepartement").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api For get total employe by departement  ! "))
      })
    )
  }
  // public check_cin(mat : any)  : Observable<any>
  // {
  //   return this.http.get("http://localhost:8080/api/Check_Cin/"+mat).pipe(
  //     catchError((err) => {
  //       return throwError(() => new Error(err + "Probleme Api For check CIN OR ID  ! "))
  //     })
  //   )
  // }







  public find_salary_employe()  : Observable<any>
  {
    return this.http.get("http://localhost:8080/apiSalary/findAllSalary").pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api For get Salaire Employé ! "))
      })
    )
  }
  public add_salary_employe(data : any)  : Observable<any>
  {
    return this.http.get("http://localhost:8080/apiSalary/apiSalary/Add_Salaire_Employe"+data).pipe(
      catchError((err) => {
        return throwError(() => new Error(err + "Probleme Api For get Salaire Employé ! "))
      })
    )
  }





}
