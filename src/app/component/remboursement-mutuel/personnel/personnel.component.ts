import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { RemboursementServicesService } from 'src/app/Service/Remboursement/remboursement-services.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  @ViewChild('Chose', { static: false }) chosenElement!: ElementRef;
  @ViewChild('ChoseOption', { static: false }) ChoseOption!: ElementRef;

  MsgError: any;
  MsgValid: any;
  id!: number;
  employeur2: any
  employeur!: Array<any>;
  Months: String | undefined
  DestinationTypes2: String | undefined
  Services!: Array<any>;
  Result!: Array<any>;
  FullName!: Array<any>
  date: Date = new Date()
  Total: number = 0
  Department!: Array<any>;

  FormsPersonnel!: FormGroup

  constructor(public EmployeurServices: EmployeurServiceService, private fb: FormBuilder,
    private ServicesRemboursementMutuel: RemboursementServicesService) { }
  ngOnInit(): void {

    this.FormsPersonnel = this.fb.group({
      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),
      Months: this.fb.control(null),

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

  public find_employeur_by_fonction_departement() {
    let Mc = this.FormsPersonnel.value.Mc
    let Mc2 = this.FormsPersonnel.value.Mc2
    this.EmployeurServices.get_employeur_by_filtre2(Mc, Mc2).subscribe({
      next: (data) => {
        this.employeur2 = data
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);
      },
    })
  }

  public find_Services() {
    let Mc = this.FormsPersonnel.value.Mc
    this.EmployeurServices.get_services(Mc).subscribe({
      next: (data) => {
        this.Services = data
      },
      error: (err) => {
        this.MsgError = err
      }
    })
  }
  public find_employer_by_forms_search() {
    let DestinationTypes = this.FormsPersonnel.value.DestinationTypes
    let ChoseOption = this.ChoseOption.nativeElement.value
    let Months = this.FormsPersonnel.value.Months
    let Mc3 = this.FormsPersonnel.value.Mc3;
    this.Months = Months
    this.DestinationTypes2 = DestinationTypes
    if (ChoseOption == "All") {
      this.ServicesRemboursementMutuel.get_total_rembourcement_by_month(Months).subscribe({
        next : (data) => {
          this.Result = data
          const sum = data.reduce((accumulator: number, currentValue: { montent1: number }) => accumulator + currentValue.montent1, 0);
          this.Total = sum
          this.Result.forEach(element => {
            this.EmployeurServices.Get_All_Employeur_By_Id(element.employeur_id).subscribe({
              next: (r) => {
                      this.FullName = r
                      alert(typeof(this.FullName))
                      alert(JSON.stringify(this.FullName))
                    }
                  })
          });
          // for (const datas of data) {
          //   this.id = datas.employeur_id
          //   this.EmployeurServices.Get_All_Employeur_By_Id(this.id).subscribe({
          //     next: (r) => {
          //       this.FullName = r.firstname + " " + r.lastname
          //       alert(typeof(this.FullName))
          //       alert(JSON.stringify(this.FullName))
          //     }
          //   })
          // }
        }
      })
      }else{
        this.ServicesRemboursementMutuel.get_total_rembourcement_by_id(Mc3, Months).subscribe({
          next: (data) => {
            this.Result = data
            const sum = data.reduce((accumulator: number, currentValue: { montent1: number }) => accumulator + currentValue.montent1, 0);
            this.Total = sum
          }
        })
      }
    }

  public Func_Active_Desactive_Filtre() {
        let ChoseOptionValue = this.ChoseOption.nativeElement.value;

        if(ChoseOptionValue === 'All') {
        this.chosenElement.nativeElement.style.pointerEvents = 'none';
      } else if (ChoseOptionValue === 'Employe') {
        this.chosenElement.nativeElement.style.pointerEvents = 'auto';
      }
    }

  }
