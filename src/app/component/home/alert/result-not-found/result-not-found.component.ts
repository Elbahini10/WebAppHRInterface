import { Component, OnInit } from '@angular/core';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-result-not-found',
  templateUrl: './result-not-found.component.html',
  styleUrls: ['./result-not-found.component.css']
})
export class ResultNotFoundComponent implements OnInit {
  constructor(public EmployeurServices : EmployeurServiceService){}
  ngOnInit(): void {
    
  }
  public Close_Page_Delete()
  {
    this.EmployeurServices.Btn_Data_Not_Found = false
  }
}
