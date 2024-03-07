import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { ServStagiairesService } from 'src/app/Service/Stagiaires/serv-stagiaires.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit{
  stagerie : any
  employeur2!: Array<any>;
  Services!: Array<any>;
  Department!: Array<any>;
  MsgError: String | undefined;
  MsgValid: String | undefined;
  date : any
  FormsAttestation!: FormGroup;

  data! : Array<any>;
  RH : String | undefined
  ChoseCatPersone : String | undefined
  dateend : any
  datestart : any
  id! : number 

  constructor(public StagerierServices: ServStagiairesService, private EmployeurServices : EmployeurServiceService
    , private fb: FormBuilder) { }
  ngOnInit(): void {

    this.FormsAttestation = this.fb.group({
      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),
      Mc4: this.fb.control(null),
      RH: this.fb.control(null),
      ChoseCatPersone: this.fb.control(null),
      dateend: this.fb.control(null)
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
  public find_employer_by_forms_search() {
    let Mc = this.FormsAttestation.value.Mc;
    this.StagerierServices.find_trainner_by_departement(Mc).subscribe({
      next: (data) => {
        if (data) {
          this.employeur2 = data
        }
      }
    })
  }
  public get_trainner_by_id()
  {
    let Mc3 = this.FormsAttestation.value.Mc3;
    this.StagerierServices.find_trainner_by_id(Mc3).subscribe({
      next: (data) => {
        if (data) {
          this.stagerie = data
          this.datestart = data.datestart
        }
      }
    })
  }


  public ChangeDateToLieu()
  {
    let date = this.FormsAttestation.value.Mc4
    let RH = this.FormsAttestation.value.RH
    let ChoseCatPersone = this.FormsAttestation.value.ChoseCatPersone
    let dateend = this.FormsAttestation.value.dateend
    this.date = date
    this.RH = RH
    this.ChoseCatPersone = ChoseCatPersone
    this.dateend = dateend
  }
  public prin_attestation_travail()
  {
    let DATA = document.getElementById('DataInfosEmployeur');
    if(DATA)
    {
      html2canvas(DATA).then((canvas) => {
        let fileWidth = 208;
        let fileHeight = (canvas.height * fileWidth) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'A4');
        let position = 0;
        PDF.addImage(FILEURI, 'JPG', 0, position, fileWidth, fileHeight);
        PDF.save('ATTESTATION_TRAVAIL.pdf');
      });

    }
  }

}
