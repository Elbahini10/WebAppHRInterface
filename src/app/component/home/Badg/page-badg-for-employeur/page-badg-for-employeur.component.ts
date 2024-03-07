import { Component, OnInit } from '@angular/core';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-page-badg-for-employeur',
  templateUrl: './page-badg-for-employeur.component.html',
  styleUrls: ['./page-badg-for-employeur.component.css']
})
export class PageBadgForEmployeurComponent implements OnInit 
 {

  Data_Employeur! : Array<any>
  MsgErrors : String | undefined

  constructor(private EmployeurServices : EmployeurServiceService){}
  ngOnInit(): void {
    
  }


  public Page_Employeur()
  {
    let id = this.EmployeurServices.id_employe
    return this.EmployeurServices.Get_All_Employeur_By_Id(id).subscribe({
      next : (data) =>{
        this.Data_Employeur = data
      },
      error : (err) => {
        this.MsgErrors = err
      },
    })
  }

}
