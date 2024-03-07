import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { RemboursementServicesService } from 'src/app/Service/Remboursement/remboursement-services.service';

@Component({
  selector: 'app-bordereaux-envoi',
  templateUrl: './bordereaux-envoi.component.html',
  styleUrls: ['./bordereaux-envoi.component.css']
})
export class BordereauxEnvoiComponent implements OnInit {

  MsgError: String | undefined;
  MsgError2: String | undefined;
  MsgValid: String | undefined;
  DestinationTypes2: String | undefined;
  Months: String | undefined;
  FullName: String | undefined;



  BtnPageDestination: boolean = false
  BtnPageAdd: boolean = false

  Department!: Array<any>
  Destination!: Array<any>
  Services!: Array<any>
  Result: any
  EmployeurServices!: Array<any>
  employeur!: Array<any>

  date : Date = new Date


  formsRemboursement!: FormGroup
  Total1: number = 0;
  Total2: number = 0;


  data : any
  id! : number
  constructor(private fb: FormBuilder, private EmployeurServiceService: EmployeurServiceService,
    private ServicesRemboursementMutuel: RemboursementServicesService) {

    }
  ngOnInit(): void {
    this.formsRemboursement = this.fb.group({
      dep: this.fb.control(null),
      DestinationTypes: this.fb.control(null),
      Months: this.fb.control(null),
      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),


      date_SOIN: this.fb.control(null),
      beneficiaire: this.fb.control(null),
      montent1: this.fb.control(null),
      montent2: this.fb.control(null),
      obs: this.fb.control(null),

    })


    this.find_Department()
    this.get_all_Destination()

  }





  public Func_Add() {
    let department = this.formsRemboursement.value.DestinationTypes
    this.ServicesRemboursementMutuel.check_destination(department).subscribe({
      next: (data) => {
        if (data == department) {
          this.MsgError2 = "Cette destination est déjà enregistrée ! "
        } else {
          const data = { department }
          this.ServicesRemboursementMutuel.Add_remboursement(data).subscribe({
            next: (data) => {
              if (data) {
                this.BtnPageDestination = false
                this.get_all_Destination()
              }
            }
          })
        }
      }
    })
  }


  public get_all_Destination() {
    this.ServicesRemboursementMutuel.find_destination().subscribe({
      next: (data) => {
        this.Destination = data
      }
    })
  }

  public Func_Close_Page() { this.BtnPageDestination = false }
  public Func_Open_Page() { this.BtnPageDestination = true }


  public Func_Close_Page_add() { this.BtnPageAdd = false }
  public Func_Open_Page_add() { this.BtnPageAdd = true }


  public find_Department() {
    this.EmployeurServiceService.get_departement().subscribe({
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
    let Mc = this.formsRemboursement.value.Mc
    // alert(Mc)
    this.EmployeurServiceService.get_services(Mc).subscribe({
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
    let Mc = this.formsRemboursement.value.Mc
    let Mc2 = this.formsRemboursement.value.Mc2
    this.EmployeurServiceService.get_employeur_by_filtre2(Mc, Mc2).subscribe({
      next: (data) => {
        this.employeur = data
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);
      },
    })
  }


  public Func_Add_Remboursement() {
    let department = this.formsRemboursement.value.DestinationTypes
    let employeur_id = this.formsRemboursement.value.Mc3
    let date_SOIN = this.formsRemboursement.value.date_SOIN
    let beneficiaire = this.formsRemboursement.value.beneficiaire
    let montent1 = this.formsRemboursement.value.montent1
    let montent2 = this.formsRemboursement.value.montent2
    let obs = this.formsRemboursement.value.obs
    let months = this.formsRemboursement.value.Months

    const data = {
      department,
      employeur_id,
      date_SOIN,
      beneficiaire,
      montent1,
      montent2,
      obs,
      months
    }
    this.ServicesRemboursementMutuel.Add_remboursement(data).subscribe({
      next : (data) =>{
        if(data)
        {
          this.BtnPageAdd = false
          this.Func_Result_Facture()
        }
      },
      error : (err) => { this.MsgError2 = err }
    })
  }


  public Func_Result_Facture()
  {
    let DestinationTypes = this.formsRemboursement.value.DestinationTypes
    let Months = this.formsRemboursement.value.Months
    this.Months = Months
    this.DestinationTypes2 = DestinationTypes

    this.ServicesRemboursementMutuel.get_all_by_month_and_destination(DestinationTypes,Months).subscribe({
      next : (data) =>{
        this.data = data
        for(const datas of this.data)
        {
          this.id = datas.employeur_id
        }
        this.EmployeurServiceService.find_employeur_by_id(this.id).subscribe({
          next : (r) => {
            this.FullName = r.firstname +" "+r.lastname
            const sum1 = data.reduce((accumulator: number, currentValue: { montent1: number }) => accumulator + currentValue.montent1, 0);
            const sum2= data.reduce((accumulator: number, currentValue: { montent2: number }) => accumulator + currentValue.montent2, 0);
            this.Total1 = sum1
            this.Total2 = sum2
          }
        })

        // data.forEach((element: { employeur_id: number; }) => {

        // });
      }
    })


  }

}
