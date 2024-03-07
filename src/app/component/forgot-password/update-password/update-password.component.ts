import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit
 {
  MsgErros!: String
  inputTypes: String = "password"
  MsgErrors: String | undefined


  constructor(){}
  ngOnInit(): void {
      
  }
  ChangeInputToText() {
    this.inputTypes = "text"
  }
  ChangeInputToPassword() {
    this.inputTypes = "password"
  }
  CloseAlertErrors() {
    this.MsgErrors = undefined
  }

}
