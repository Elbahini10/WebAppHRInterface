import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../Service/Login/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authLogin : AuthService , private routes : Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   let authGuards = this.authLogin.isAuth()
   if(authGuards == false)
   {
    this.routes.navigateByUrl("")
    return false
   }
   else{
     return true
   }
  }
}
