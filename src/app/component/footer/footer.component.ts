import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/Login/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit
 {
  constructor(private authLogin : AuthService ,   private router : Router){}
  ngOnInit(): void {
      
  }
  ColseAuth(){
    let check = this.authLogin.authUser = undefined
    if(check == undefined)
    {
      localStorage.removeItem("authUser")
      this.router.navigateByUrl("")
    }
  }
}
