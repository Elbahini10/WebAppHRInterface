import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CongeService } from 'src/app/Service/Conge/conge.service';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  FormsConge!: FormGroup

  CongeAnnuel: boolean = false
  CongeRecuperer: boolean = false
  JourRecuper: boolean = false
  Add: boolean = false

  data = new Date()

  employeur!: Array<any>


  // conge  : any [] = []
  datas: any

  Department!: Array<any>
  congeRecupe!: Array<any>
  congeAnnuel!: Array<any>
  JoursRecupe!: Array<any>


  Days: any
  SoldeDays: any
  day1: any
  day2: any
  nbJourRecup: number = 0


  Services!: Array<any>




  fullname!: String
  departement!: String
  fonction !: String
  mat !: String

  MsgError: any;
  MsgValid: any;


  TotalCongeRecup!: number
  TotalCongeAnnuel !: number



  constructor(private fb: FormBuilder, public EmployeurServices: EmployeurServiceService,
    public congeServices: CongeService) { }
  ngOnInit(): void {
    this.FormsConge = this.fb.group({
      CongeTypes: this.fb.control(null),
      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),


      id_empl: this.fb.control(null),
      dateDebutRecup: this.fb.control(null),
      dateFinRecup: this.fb.control(null),
      jours: this.fb.control(null),
      obs: this.fb.control(null),
      dateDebut: this.fb.control(null),
      dateFin: this.fb.control(null),
    })
    this.find_Department()
  }





  public find_Department() {
    this.EmployeurServices.get_departement().subscribe({
      next: (data) => {
        this.Department = data
        console.log(this.Department)
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);

      },
    })
  }

  public find_Services() {
    let Mc = this.FormsConge.value.Mc
    // alert(Mc)
    this.EmployeurServices.get_services(Mc).subscribe({
      next: (data) => {
        this.Services = data
        // console.log(this.Services);
      },
      error: (err) => {
        this.MsgError = err
      }
    })
  }

  public find_employeur_by_fonction_departement() {
    let Mc = this.FormsConge.value.Mc
    let Mc2 = this.FormsConge.value.Mc2
    this.EmployeurServices.get_employeur_by_filtre2(Mc, Mc2).subscribe({
      next: (data) => {
        this.employeur = data
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);
      },
    })
  }

  public find_employer_by_forms_search() {
    let Mc3 = this.FormsConge.value.Mc3;
    this.congeServices.id = Mc3
    this.EmployeurServices.find_employeur_by_id(Mc3).subscribe({
      next: (data) => {
        this.datas = data;
        this.congeServices.find_cong_recup_by_id_employeur(this.datas.id).subscribe({
          next: (data2) => {
            this.congeRecupe = data2
            this.congeServices.find_total_recup_conge_by_id(this.datas.id).subscribe({
              next: (data3) => {
                let Total = data3
                this.congeServices.find_day_recupe_by_id(this.datas.id).subscribe({
                  next: (data4) => {
                    this.JoursRecupe = data4;
                    this.JoursRecupe.forEach(data => {
                      let day1 = new Date(data.dateDebut)
                      let day2 = new Date(data.dateFin)
                      let diff = Math.ceil((day2.getTime() - day1.getTime()));
                      this.TotalCongeRecup = Math.abs(Math.ceil(diff / (1000 * 60 * 60 * 24)));
                      let d = this.TotalCongeRecup + this.TotalCongeRecup
                      this.SoldeDays = Total - d
                    });
                  },
                });
              }
            })
          }
        })
        this.congeServices.find_conge_annuel_by_id_employeur(this.datas.id).subscribe({
          next: (data2) => {
            this.congeAnnuel = data2
          }
        })
        this.congeServices.find_total_recup_conge_by_id(this.datas.id).subscribe({
          next: (data3) => {
            let Total = data3
            this.congeServices.find_day_recupe_by_id(this.datas.id).subscribe({
              next: (data4) => {
                this.JoursRecupe = data4;
                this.congeServices.find_total_recup_prendre_conge_by_id(this.datas.id).subscribe({
                  next: (data) => {
                    let su = data
                    this.SoldeDays = Total - su
                  }
                })
                this.JoursRecupe.forEach(data => {
                  let day1 = new Date(data.dateDebut)
                  let day2 = new Date(data.dateFin)
                  let diff = Math.ceil((day2.getTime() - day1.getTime()));
                  this.TotalCongeRecup = Math.abs(Math.ceil(diff / (1000 * 60 * 60 * 24)));
                  let d = this.TotalCongeRecup + this.TotalCongeRecup
                  // this.SoldeDays =  Total - d
                });
              },
            });
          }
        })
        this.congeServices.find_total_annuel_conge_by_id(this.datas.id).subscribe({
          next: (data3) => {
            this.TotalCongeAnnuel = data3
          }
        })
        this.congeServices.find_day_recupe_by_id(this.datas.id).subscribe({
          next: (data4) => {
            this.JoursRecupe = data4;
            this.JoursRecupe.forEach(data => {
              this.day1 = new Date(data.dateDebut)
              this.day2 = new Date(data.dateFin)
              // this.SoldeDays = Math.ceil((this.day2 - this.day1) );
            });
          },
        });
      },
      error: (err) => {
        // this.MsgError = err;
      },
    });
  }

  public func_add_conge() {
    let id_Employer = this.FormsConge.value.Mc3;
    let dateDebutRecup = this.FormsConge.value.dateDebutRecup;
    let dateFinRecup = this.FormsConge.value.dateFinRecup;
    let observation = this.FormsConge.value.obs;
    let typeRecup = this.FormsConge.value.CongeTypes;
    var day1 = new Date(dateDebutRecup);
    var day2 = new Date(dateFinRecup);
    let diff = day2.getTime() - day1.getTime();
    let nbJourRecup = Math.abs(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    const data = { dateDebutRecup, dateFinRecup, nbJourRecup, typeRecup, id_Employer, observation }

    if (data.nbJourRecup <= 0) {
      this.MsgError = "Ajouter un Nombre Superieur 0 "
    } else {
      this.congeServices.Create_Conge(data).subscribe({
        next: (data) => {
          if (data) {
            this.MsgValid = "Votre Conge A ete Enregistrer en Success ! "
            this.CongeRecuperer = true
            this.CongeAnnuel = false
            this.Add = false
          }
        },
        error: (err) => {
          this.MsgError = err
        }
      })
    }

  }

  public func_add_recup() {
    let id_Employer = this.FormsConge.value.Mc3;
    let dateDebut = this.FormsConge.value.dateDebut;
    let dateFin = this.FormsConge.value.dateFin;
    const data = { dateDebut, dateFin, id_Employer }

    this.congeServices.Create_Conge(data).subscribe({
      next: (data) => {
        if (data) {
          this.MsgValid = "Votre Conge A ete Enregistrer en Success ! "
          this.CongeRecuperer = true
          this.CongeAnnuel = false
          this.Add = false
        }
      },
      error: (err) => {
        this.MsgError = err
      }
    })
  }


  public Fun_Btn_Add_Recup() {
    this.congeServices.Btn_Add_Recuperation = true
  }



  public Func_Change_Conge() {
    let CongeTypes = this.FormsConge.value.CongeTypes
    if (CongeTypes == "CR") {
      this.CongeRecuperer = true
      this.CongeAnnuel = false
      this.JourRecuper = false
      this.Add = false
    } else if (CongeTypes == "JR") {
      this.JourRecuper = true
      this.CongeRecuperer = false
      this.CongeAnnuel = false
      this.Add = false
    } else if (CongeTypes == "CA") {
      this.CongeAnnuel = true
      this.CongeRecuperer = false
      this.JourRecuper = false
      this.Add = false
    }

  }

  public Func_Add() {
    this.Add = true
    this.CongeAnnuel = false
    this.CongeRecuperer = false
    this.JourRecuper = false
  }
}
