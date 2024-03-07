import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { PlanningServicesService } from 'src/app/Service/Planning/planning-services.service';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  @ViewChild('MyId', { static: false }) MyId?: ElementRef;


  FormsPlaning!: FormGroup
  Date_Employeur!: Array<any>
  Department!: Array<any>
  MsgErros: String | undefined
  MsgValids: String | undefined
  employeur!: Array<any>
  Id: any
  daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


  // employeur: any;
  constructor(private fb: FormBuilder, public EmployeurServices: EmployeurServiceService, private servicesPlanning: PlanningServicesService) { }

  ngOnInit(): void {


    this.FormsPlaning = this.fb.group({


      Date_Debut: this.fb.control(null),
      Date_Fin: this.fb.control(null),
      Id_Employeur: this.fb.control(null),
      depart: this.fb.control(null),

      Lundi_First: this.fb.control(null),
      Lundi_Last: this.fb.control(null),

      Mardi_First: this.fb.control(null),
      Mardi_Last: this.fb.control(null),

      Mercredi_First: this.fb.control(null),
      Mercredi_Last: this.fb.control(null),

      Jeudi_First: this.fb.control(null),
      Jeudi_Last: this.fb.control(null),

      Vendredi_First: this.fb.control(null),
      Vendredi_Last: this.fb.control(null),

      Samedi_First: this.fb.control(null),
      Samedi_Last: this.fb.control(null),

      Dimanche_First: this.fb.control(null),
      Dimanche_Last: this.fb.control(null),





    })
    this.find_Department();
    this.get_employeur();


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

  public find_Department() {
    this.EmployeurServices.get_departement().subscribe({
      next: (data) => {
        this.Department = data
        console.log(this.Department)
      },
      error: (err) => {
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

  public Func_Add_Planning() {
    


    let employeur_id   = this.FormsPlaning.value.Id_Employeur;
    let dateDebut = this.FormsPlaning.value.Date_Debut;
    let dateFin = this.FormsPlaning.value.Date_Fin;
    let department = this.FormsPlaning.value.depart;


    let lundi_First = this.FormsPlaning.value.Lundi_First;
    let lundi_Last = this.FormsPlaning.value.Lundi_Last;

    let mardi_First = this.FormsPlaning.value.Mardi_First;
    let mardi_Last = this.FormsPlaning.value.Mardi_Last;


    let mercredi_First = this.FormsPlaning.value.Mercredi_First;
    let mercredi_Last = this.FormsPlaning.value.Mercredi_Last;

    let jeudi_First = this.FormsPlaning.value.Jeudi_First;
    let jeudi_Last = this.FormsPlaning.value.Jeudi_Last;

    let vendredi_First = this.FormsPlaning.value.Vendredi_First;
    let vendredi_Last = this.FormsPlaning.value.Vendredi_Last;

    let samedi_First = this.FormsPlaning.value.Samedi_First;
    let samedi_Last = this.FormsPlaning.value.Samedi_Last;

    let dimanche_First = this.FormsPlaning.value.Dimanche_First;
    let dimanche_Last = this.FormsPlaning.value.Dimanche_Last;

    const data = {
      department,
      dateDebut,
      dimanche_Last,
      samedi_First,
      vendredi_Last,
      dimanche_First,
      dateFin,
      mercredi_First,
      lundi_First,
      mercredi_Last,
      jeudi_First,
      lundi_Last,
      jeudi_Last,
      mardi_First,
      mardi_Last,
      vendredi_First,
      samedi_Last,
      employeur_id
    }
    this.servicesPlanning.Create_Planning(data).subscribe({
      next: (data) => {
        this.MsgValids = "Votre planning a été enregistré avec succès ! "
      },
      error: (err) => {
        this.MsgErros = err
      }
    })





  }


}

