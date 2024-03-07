import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-travail',
  templateUrl: './travail.component.html',
  styleUrls: ['./travail.component.css']
})
export class TravailComponent implements OnInit {

  @ViewChild('DataInfosEmployeur', { static: false }) DataInfosEmployeur!: ElementRef

  employeur: any
  employeur2!: Array<any>;
  Services!: Array<any>;
  Department!: Array<any>;
  MsgError: String | undefined;
  MsgValid: String | undefined;
  date: any
  FormsAttestation!: FormGroup;


  public PDF_Width?: any;
  public PDF_Height?: any;

  data!: Array<any>;
  DG: String | undefined
  id!: number

  constructor(public EmployeurServices: EmployeurServiceService, private fb: FormBuilder) { }
  ngOnInit(): void {

    this.FormsAttestation = this.fb.group({
      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),
      Mc4: this.fb.control(null),
      DG: this.fb.control(null)
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
    let Mc = this.FormsAttestation.value.Mc
    let Mc2 = this.FormsAttestation.value.Mc2
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
    let Mc = this.FormsAttestation.value.Mc
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
    let Mc3 = this.FormsAttestation.value.Mc3;
    this.id = Mc3
    this.EmployeurServices.find_employeur_by_id(this.id).subscribe({
      next: (data) => {
        if (data) {
          this.employeur = data
        }
      }
    })
  }

  public ChangeDateToLieu() {
    let date = this.FormsAttestation.value.Mc4
    let DG = this.FormsAttestation.value.DG
    this.date = date
    this.DG = DG
  }


  public prin_attestation_travail() {
    let data = this.DataInfosEmployeur.nativeElement
    const pdf = new jsPDF("p","mm","A4");
    pdf.html(data, {
      callback: function (pdf) {
        pdf.setFontSize(10)
        pdf.setFont('italic');
        pdf.save("output.pdf");
      },
    });
  }
}
