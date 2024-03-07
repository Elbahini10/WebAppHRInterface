import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Service/Home/home.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
 {
  constructor(private homeServices : HomeService){}
  ngOnInit(): void {
      
  }

  OpenMyProfile()
  {
    this.homeServices.Btn_Open_My_Profile = true
  }
}
