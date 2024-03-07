import { Injectable } from '@angular/core';
import { AppUser } from 'src/app/model/user.model';
import { UUID } from 'angular2-uuid';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: AppUser[] = []
  authUser : AppUser | undefined

  readonly Url = "http://localhost:8080/api/user/"
  readonly Url_User = "http://localhost:8080/api/user/CreateUser"
  readonly Url_Check_User_If_Not_Existe = "http://localhost:8080/api/user/CheckUsersIfNotExiste"

  constructor(private http : HttpClient) {

    this.users.push({ userId: UUID.UUID(), username: "test",firstname : "Ismail",lastname : "El Bahini",mdp: "test", roles: ["USER"] })
    this.users.push({ userId: UUID.UUID(), username: "admin",firstname : "admin",lastname : "admin", mdp: "admin", roles: ["ADMIN", "USER"] })

  }


  // // Configuration Authentication Spring Security JWT Whit Angular

  //   public LoginJWT(username : string , password : string){
  //     let options = {
  //       headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
  //     }
  //     let params = new HttpParams().set("username",username).set("password",password);
  //     return this.http.post("http://localhost:8080/Auth/login",params,options)
  //   }


  public Login(username: String, mdp: String): Observable<any> {

    return this.http.get(this.Url+"Login/"+username+"/"+mdp).pipe(
        catchError((err) => {
          return throwError(() => new Error(err + "Probleme API Login"))
        })
    )

    let appUser = this.users.find(u => u.username == username);
    if (!appUser) return throwError(() => new Error(" : Utilisateur non trouvé ! "))
    if (appUser?.mdp != mdp) { throwError(() => new Error(" : Mot de passe introuvable ! ")) }
    return of(appUser);
  }
  // public Login(username: String, mdp: String): Observable<AppUser> {
  //   let appUser = this.users.find(u => u.username == username);
  //   if (!appUser) return throwError(() => new Error(" : Utilisateur non trouvé ! "))
  //   if (appUser?.mdp != mdp) { throwError(() => new Error(" : Mot de passe introuvable ! ")) }
  //   return of(appUser);
  // }

  public authenticateUser(appUser : AppUser) : Observable<boolean>
  {
    this.authUser = appUser;
    localStorage.setItem("authUser" , JSON.stringify({username : appUser.username , firstname : appUser.firstname, lastname : appUser.lastname , roles : appUser.roles
    , JWT : "JWT_TOKEN"}))
    return of(true)
  }


  public Check_User_Is_Admin(roles : String) : boolean
  {
    return this.authUser!.roles.includes(roles)
  }

  public isAuth()
  {
    return this.authUser!=undefined
  }

  public Create_User(data : any)
  {
   return this.http.post(this.Url_User,data).pipe(
       catchError((err) => {
        return throwError(() => new Error(err  + "Probleme Create Account User ! "))
      })
    )
  }


  public Check_User_If_Not_Existe(username : String)
  {
    return this.http.get(this.Url_Check_User_If_Not_Existe+'/'+username).pipe(
      catchError((err) => {
        return throwError(() => new Error(err  + "Probleme For Check  User ! "))
      })
    )
  }






}
