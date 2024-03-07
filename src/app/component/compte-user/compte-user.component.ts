import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Service/Home/home.service';

@Component({
  selector: 'app-compte-user',
  templateUrl: './compte-user.component.html',
  styleUrls: ['./compte-user.component.css']
})
export class CompteUserComponent implements OnInit {
  inputTypes: String = "password"

  constructor(private homeServices : HomeService){}
  ngOnInit(): void {
    console.log(localStorage.getItem("firstname"));
    console.log(localStorage.getItem("lastname"));
    

  }
  ChangeInputToText() {
    this.inputTypes = "text"
  }
  ChangeInputToPassword() {
    this.inputTypes = "password"
  }

  Close_My_Profile()
  {
    this.homeServices.Btn_Open_My_Profile = false
  }






}
