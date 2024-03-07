import { Component, OnInit } from '@angular/core';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { HomeService } from 'src/app/Service/Home/home.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit
{
  TotalEmploye : any
  Departement! : Array<any>

  constructor(public servicesHome : HomeService , private EmployeurServices : EmployeurServiceService){}
  ngOnInit(): void {
      this.find_total_employe()
      this.find_departement_employe()
  }

  public find_total_employe()
  {
    this.EmployeurServices.get_total_employeur().subscribe({
      next : (data) => {
        this.TotalEmploye = data
      }
    })
  }

  public find_departement_employe()
  {
    this.EmployeurServices.find_total_employe_by_departement().subscribe({
      next : (data) => {
        this.Departement = data
        console.log(this.Departement);
        
      }
    })
  }
}
