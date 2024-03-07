import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-list-planing',
  templateUrl: './list-planing.component.html',
  styleUrls: ['./list-planing.component.css']
})
export class ListPlaningComponent implements OnInit
 {
  Department! : Array<any>
  employeur! : Array<any>
  Date_Employeur! : Array<any>
  FormsPlaning! : FormGroup

  constructor(private fb : FormBuilder , public EmployeurServices: EmployeurServiceService){}
  ngOnInit(): void {
    this.find_Department();
  }
  public find_Department() {
    this.EmployeurServices.get_departement().subscribe({
      next: (data) => {
        this.Department = data
        console.log(this.Department)
      },
      error: (err) => {
        // this.MsgError = err
        console.log(err);

      },
    })
  }
  public get_employeur() {
    let depart = this.FormsPlaning.value.depart;
    this.EmployeurServices.get_employeur_by_departement(depart).subscribe({
      next: (data) => {
        this.employeur = data
      },
      error: (err) => {
        // this.MsgError = err
      },
    })
  }
  public Filtre_DAte_Debut_Fin() {
    let dateDebut = new Date(this.FormsPlaning.value.Date_Debut);
    let dateFin = new Date(this.FormsPlaning.value.Date_Fin);

    let differenceInDays = Math.floor((dateFin.getTime() - dateDebut.getTime()) / (1000 * 3600 * 24));
    if (differenceInDays > 7) {
      alert("La différence entre la date de début et la date de fin dépasse 7 jours !");
    } else {
      let dateArray = [];
      for (let i = 0; i <= differenceInDays; i++) {
        let currentDate = new Date(dateDebut);
        currentDate.setDate(dateDebut.getDate() + i);      
        dateArray.push(currentDate.toISOString().slice(0, 10));
      }
      this.Date_Employeur = dateArray;
      console.log(this.Date_Employeur[0]);
    }
  }
}
