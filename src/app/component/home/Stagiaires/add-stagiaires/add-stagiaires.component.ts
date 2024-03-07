import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { ServStagiairesService } from 'src/app/Service/Stagiaires/serv-stagiaires.service';
import { validate } from 'uuid';

@Component({
  selector: 'app-add-stagiaires',
  templateUrl: './add-stagiaires.component.html',
  styleUrls: ['./add-stagiaires.component.css']
})
export class AddStagiairesComponent implements OnInit {

  MsgError: String | undefined
  MsgValide: String | undefined
  Departement!: Array<any>

  forms_Stagiaires!: FormGroup

  constructor(private fb: FormBuilder, private StagiairesServices: ServStagiairesService, private EmployeurServices: EmployeurServiceService) { }
  ngOnInit(): void {

    this.get_departement()

    this.forms_Stagiaires = this.fb.group({
      firstname: this.fb.control(null),
      lastname: this.fb.control(null),
      datebirth: this.fb.control(null),
      datestart: this.fb.control(null),
      dateend: this.fb.control(null),
      cin: this.fb.control(null),
      phone: this.fb.control(null),
      img: this.fb.control(null),
      placeBirth: this.fb.control(null),
      country: this.fb.control(null),
      city: this.fb.control(null),
      ctrl_Stage: this.fb.control(null),
      assurance: this.fb.control(null),
      resume: this.fb.control(null),
      department: this.fb.control(null),
      school: this.fb.control(null),
      fonction: this.fb.control(null),
      etat: this.fb.control(null),
      state: this.fb.control(null)
    })

  }

  on_submit_forms_stagiairesr() {

    let firstname = this.forms_Stagiaires.value.firstname
    let lastname = this.forms_Stagiaires.value.lastname
    let datebirth = this.forms_Stagiaires.value.datebirth;
    let datestart = this.forms_Stagiaires.value.datestart;
    let dateend = this.forms_Stagiaires.value.dateend;
    let cin = this.forms_Stagiaires.value.cin;
    let phone = this.forms_Stagiaires.value.phone;
    let img = this.forms_Stagiaires.value.img;
    let placeBirth = this.forms_Stagiaires.value.placeBirth;
    let country = this.forms_Stagiaires.value.country;
    let city = this.forms_Stagiaires.value.city;
    let ctrl_Stage = this.forms_Stagiaires.value.ctrl_Stage;
    let assurance = this.forms_Stagiaires.value.assurance;
    let resume = this.forms_Stagiaires.value.resume;
    let department = this.forms_Stagiaires.value.department;
    let school = this.forms_Stagiaires.value.school;
    let fonction = this.forms_Stagiaires.value.fonction;
    let etat = this.forms_Stagiaires.value.etat;
    let state = this.forms_Stagiaires.value.state;

    if (firstname == null && lastname == null && datebirth == null && datebirth == null &&
      cin == null && department == null && fonction == null && school == null && etat == null &&
      city == null && phone == null && country == null && etat == null && placeBirth == null) {
      this.MsgError = "Vous devez remplir tous les champs marqués * "
    } else {

      const data = {

        firstname,
        lastname,
        datebirth,
        datestart,
        cin,
        phone,
        img,
        country,
        city,
        assurance,
        resume,
        department,
        fonction,
        etat,
        state,
        placeBirth,
        ctrl_Stage,
        school,
      }
      if (data.cin != null)
        this.StagiairesServices.Create_Stagiaires(data).subscribe({
          next: (data) => {
            this.MsgValide = "Le stagiaire a été inscrit avec succès ! "
          },
          error: (err) => {
            this.MsgError = err
          },
        })

    }



  }

  public get_departement() {
    this.EmployeurServices.get_departement().subscribe({
      next: (data) => {
        this.Departement = data
      },
      error: (err) => {
        this.MsgError = err
      },
    })
  }


}
