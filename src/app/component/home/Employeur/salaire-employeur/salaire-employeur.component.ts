import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-salaire-employeur',
  templateUrl: './salaire-employeur.component.html',
  styleUrls: ['./salaire-employeur.component.css'],
})
export class SalaireEmployeurComponent implements OnInit {
  MsgError!: String;
  MsgValid!: String;

  FormsSalaire!: FormGroup;

  Department!: Array<any>;
  Services!: Array<any>;
  employeur!: Array<any>;
  employeur2!: Array<any>;
  SalaireEmployeur!: Array<any>;

  BtnPageAdd: boolean = false;
  BtnPageAdd2: boolean = false;

  constructor(
    private fb: FormBuilder,
    private EmployeurServiceService: EmployeurServiceService
  ) {}
  ngOnInit(): void {
    this.FormsSalaire = this.fb.group({
      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),
      salaireNet: this.fb.control(null),
      salaireBrut: this.fb.control(null),
      dateAugmentation: this.fb.control(null),
      mt_augmentait: this.fb.control(null),
      obs: this.fb.control(null),
    });

    this.find_Department();
    this.get_salary_employe();
  }


  public find_Department() {
    this.EmployeurServiceService.get_departement().subscribe({
      next: (data) => {
        this.Department = data;
        console.log(this.Department);
      },
      error: (err) => {
        this.MsgError = err;
        console.log(err);
      },
    });
  }
  public find_employeur_by_fonction_departement() {
    let Mc = this.FormsSalaire.value.Mc;
    let Mc2 = this.FormsSalaire.value.Mc2;
    this.EmployeurServiceService.get_employeur_by_filtre2(Mc, Mc2).subscribe({
      next: (data) => {
        this.employeur = data;
      },
      error: (err) => {
        this.MsgError = err;
        console.log(err);
      },
    });
  }

  public find_Services() {
    let Mc = this.FormsSalaire.value.Mc;
    this.EmployeurServiceService.get_services(Mc).subscribe({
      next: (data) => {
        this.Services = data;
      },
      error: (err) => {
        this.MsgError = err;
      },
    });
  }


  public Func_Add_Augmantation_Salaire(){
    let Mc3 = this.FormsSalaire.value.Mc3;
    let dateAugmentation = this.FormsSalaire.value.dateAugmentation;
    let mt_augmentait = this.FormsSalaire.value.mt_augmentait;
    let obs = this.FormsSalaire.value.obs;
    const data = {Mc3,dateAugmentation,mt_augmentait,obs,}

    // alert(JSON.stringify(data))

  }

  public Func_Add_Salaire(){
    let Mc3 = this.FormsSalaire.value.Mc3;
    let salaireNet = this.FormsSalaire.value.salaireNet;
    let salaireBrut = this.FormsSalaire.value.salaireBrut;
    const data = {Mc3,salaireNet,salaireBrut}

    this.EmployeurServiceService.add_salary_employe(data).subscribe({
      next: (s) => {
            this.BtnPageAdd = false;

      },
      error: (err) => {
        this.MsgError = err;
      },
    })

    // alert(JSON.stringify(data))





  }














  public get_salary_employe() {

    this.EmployeurServiceService.find_salary_employe().subscribe({
      next : (data) => {
        this.SalaireEmployeur = data
      },
      error : (err) => {
        
      }
    })


  }





  public Func_Close_Page_add() {
    this.BtnPageAdd = false;
  }
  public Func_Open_Page_add() {
    this.BtnPageAdd = true;
  }

  public Func_Close_Page_add2() {
    this.BtnPageAdd2 = false;
  }
  public Func_Open_Page_add2() {
    this.BtnPageAdd2 = true;
  }
}
