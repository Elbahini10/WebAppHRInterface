import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CongeService } from 'src/app/Service/Conge/conge.service';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css']
})
export class AddCongeComponent implements OnInit {
  FormsAdd!: FormGroup
  data: any
  MsgError: String | undefined
  JoursRecupe : any

    day1 : any
    day2  : any
  constructor(private EmployeurServices: EmployeurServiceService, private fb: FormBuilder ,
    public congeServices : CongeService) { }
  ngOnInit(): void {
    this.FormsAdd = this.fb.group({
      dateDebut: this.fb.control(null),
      dateFin: this.fb.control(null)
    })
    this.find_employer_by_forms_search()
  }

  public find_employer_by_forms_search() {
    this.EmployeurServices.find_employeur_by_id(this.congeServices.id).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (err) => {
        this.MsgError = err;
      },
    });
  }

  public Add_Conger() {
    let id_Employer = this.congeServices.id;
    let dateDebut = this.FormsAdd.value.dateDebut;
    let dateFin = this.FormsAdd.value.dateFin; 
     this.day1 = new Date(dateDebut)
     this.day2 = new Date(dateFin)

     this.congeServices.find_total_recup_conge_by_id(id_Employer).subscribe({
      next: (data4) => {
        this.JoursRecupe = data4;
      },
      });
      let Total_Day = Math.ceil(Math.abs((this.day2 - this.day1) / (1000 * 60 * 60 * 24)));
     if(Total_Day < Total_Day || Total_Day > this.JoursRecupe)
     {
      this.MsgError = "Vous n'avez pas assez de crédit ! "
     }else{
      let diff  = Math.ceil(( this.day2.getTime() -  this.day1.getTime()));
      let nbJour =   Math.abs(Math.ceil(diff / (1000 * 60 * 60 * 24)));
      const data = {dateDebut,dateFin,id_Employer,nbJour}
      alert(JSON.stringify(data))
      this.congeServices.Create_Conge(data).subscribe({
        next : (data) => {
          if(data)
          {
            this.congeServices.Btn_Add_Recuperation = false
          }
        },
        error : (err) => {
          this.MsgError = err
        }
      })  
     }
  }




  public Fun_Cancel_Page()
  {
    this.congeServices.Btn_Add_Recuperation = false
  }

}
