import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
 {
  employeur! : Array<any>
  MsgError! : String

  spinner : boolean = false
  

  constructor(private EmployeurServices : EmployeurServiceService , private router : Router){}
  ngOnInit(): void {
    this.get_employeur_bi_id()
  }


  public Close_Profile_Employeur()
  {
    document.addEventListener("keydown",()=>{
      this.EmployeurServices.Btn_Show_Profile = false
    })
    this.EmployeurServices.Btn_Show_Profile = false
  }

  public get_employeur_bi_id()
  {
    this.EmployeurServices.Get_All_Employeur_By_Id(this.EmployeurServices.Id_Employeur).subscribe({
      next : (data) => {
        this.employeur = data
        console.log(this.employeur);
        
      },
      error  : (err) => {
          this.MsgError = err
          console.log(err);
          
      },
    })
  }


  public print_info_employeur()
  {
    let DATA = document.getElementById('DataInfosEmployeur');
    if(DATA)
    {
      this.spinner = true
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'JPG', 0, position, fileWidth, fileHeight);
        PDF.save('angular-demo.pdf');
        this.spinner = false
      });

    }
  }


}
