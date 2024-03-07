import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit
 {
  Forms_RECOVER! : FormGroup
  MsgErrors : String  | undefined
  constructor(private router : Router){}
  ngOnInit(): void {
      
  }
  On_Submit_Recovry()
  {

  }
  CloseAlertErrors() {
    this.MsgErrors = undefined
  }

  goToLogin() 
  {
  }

}
