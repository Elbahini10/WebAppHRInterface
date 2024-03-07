import { Component, OnInit } from '@angular/core';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-delete-employeur',
  templateUrl: './delete-employeur.component.html',
  styleUrls: ['./delete-employeur.component.css']
})
export class DeleteEmployeurComponent implements OnInit {

  Lastname!: String
  Firstname!: String

  constructor(private EmployeurServices: EmployeurServiceService) { }
  ngOnInit(): void {
    
    this.get_employe_by_id()

  }
  public delete_employe_by_id() {
    this.EmployeurServices.Delete_Employe_By_Id(this.EmployeurServices.id_employe).subscribe(() => {
      this.EmployeurServices.Btn_Delete = false
    }, ((err) => {
    }))
  }
  public get_employe_by_id() {
    this.EmployeurServices.Get_All_Employeur_By_Id(this.EmployeurServices.id_employe).subscribe(
      (data) => {
        this.Firstname = data.firstname
        this.Lastname = data.lastname
      }
    )
  }

  public Close_Page_Delete() {
    this.EmployeurServices.Btn_Delete = false
  }

}
