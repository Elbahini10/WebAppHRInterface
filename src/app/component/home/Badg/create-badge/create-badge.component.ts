import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { jsPDF } from 'jspdf'
// import * as jsPDF from 'jspdf';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { PaysService } from 'src/app/Service/Pays/pays.service';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.css']
})
export class CreateBadgeComponent implements OnInit {


  @ViewChild('Badge', { static: false }) Badge!: ElementRef
  @ViewChild('Add', { static: false }) Add!: ElementRef
  @ViewChild('Loss', { static: false }) Loss!: ElementRef

  @ViewChild('Filtre', { static: false }) Filtre!: ElementRef
  @ViewChild('Generate', { static: false }) Generate!: ElementRef


  start: number = 1
  end: number = 10
  number_of_badge: number = 0
  NumberInput: number = 1
  flagMapping: { [key: string]: string } = {};
  flags: any

  Date_Employeur!: Array<any>
  employeur: any
  employeur2 = []



  Department!: Array<any>
  Etat!: Array<any>
  Services!: Array<any>

  Mat: any
  lang: any
  paysValue2!: Array<any>
  i: any

  ObjetEmployeur = {}

  FormsBadgs!: FormGroup

  countries: any[] = [];
  ChoseCountry = {}
  flagInfoArray: { country: string; flagUrl: string; }[] | undefined;
  Infos_Badgs!: {
    Firstname: any, Lastname: any; Fonction: any;
    Flags: {
      Flags1: any; Flags2: any; Flags3: any;
      Flags4: any; Flags5: any; Flags6: any;
      Flags7: any; Flags8: any; Flags9: any;
      Flags10: any;
    };
  };
  pdfUrl = ''


  pdfOptions = {
    pageFormat: 'A4' // or 'A3' based on your requirement
  };

  @ViewChild('pdfTable') pdfTable!: ElementRef;
  MsgError: any;
  id: any;

  onConfirm() {
    const pages = this.pdfTable.nativeElement;
    this.exportAllToPDF(pages, this.pdfOptions);
  }

  range(): number[] {
    let start = this.start
    let end = this.end
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  range2(): number[] {
    let start = this.start
    let end = this.NumberInput
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  range3(): number[] {
    let start = 1
    let end = this.number_of_badge
    return Array.from({ length: end - start + 1 }, (_, index) => start + index)
  }

  constructor(private fb: FormBuilder, private ServicesPays: PaysService, public ServicesEmployeur: EmployeurServiceService) { }
  ngOnInit(): void {

    this.ObjetEmployeur = { mat: this.Mat }

    this.FormsBadgs = this.fb.group({
      NB: this.fb.control(null),
      Fullname: this.fb.control(null),
      function: this.fb.control(null),

      Mc: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null),
      Changer: this.fb.control(null),


      pays_1: this.fb.control(null),
      pays_2: this.fb.control(null),
      pays_3: this.fb.control(null),
      pays_4: this.fb.control(null),
      pays_5: this.fb.control(null),
      pays_6: this.fb.control(null),
      pays_7: this.fb.control(null),
      pays_8: this.fb.control(null),
      pays_9: this.fb.control(null),
      pays_10: this.fb.control(null),

    });

    this.Func_Pays_API()
    this.find_Department()

    this.Infos_Badgs = {
      Firstname: null,
      Lastname: null,
      Fonction: "",
      Flags: {
        Flags1: "",
        Flags2: "",
        Flags3: "",
        Flags4: "",
        Flags5: "",
        Flags6: "",
        Flags7: "",
        Flags8: "",
        Flags9: "",
        Flags10: "",
      }
    }
  }


  public find_employer_by_forms_search() {
    let Mc3 = this.FormsBadgs.value.Mc3;
    this.id = Mc3
    this.ServicesEmployeur.find_employeur_by_id(this.id).subscribe({
      next: (data) => {
        if (data) {
          this.employeur = data
        }
      }
    })
  }


  public Func_Pays_API() {
    const url = 'https://restcountries.com/v3.1/all';

    axios.get(url)
      .then(response => {
        this.countries = response.data;
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }
  public Fun_NB_Pays() {
    let numero = this.FormsBadgs?.value.NB
    this.NumberInput = numero
  }
  public find_Department() {
    this.ServicesEmployeur.get_departement().subscribe({
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
    let Mc = this.FormsBadgs.value.Mc
    let Mc2 = this.FormsBadgs.value.Mc2
    this.ServicesEmployeur.get_employeur_by_filtre2(Mc, Mc2).subscribe({
      next: (data) => {
        this.employeur = data
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);
      },
    })
  }
  public find_Services() {
    let Mc = this.FormsBadgs.value.Mc
    // alert(Mc)
    this.ServicesEmployeur.get_services(Mc).subscribe({
      next: (data) => {
        this.Services = data
        console.log(this.Services);
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);

      },
    })
  }
  public find_employeur_by_FullName() {

    let NB = this.FormsBadgs.value.NB;

    const fetchPromises: Promise<void>[] = [];
    const flagsMapping: { [key: string]: string } = {};


    const flagInfoArray: { country: string, flagUrl: string }[] = [];

    for (let i = 1; i <= NB; i++) {
      let controlName = `pays_${i}`;
      let paysValue = this.FormsBadgs.get(controlName)?.value;

      if (paysValue) {
        const apiUrl = 'https://restcountries.com/v3.1/name/' + paysValue;

        const fetchPromise = fetch(apiUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            const countryData = data[0];
            if (countryData.flags && countryData.flags.svg) {
              const flagUrl = countryData.flags.svg;
              flagInfoArray.push({ country: paysValue, flagUrl: flagUrl });
              console.log(`The flag of ${paysValue} can be found at: ${flagUrl}`);
            } else {
              console.log(`Flag information not available for ${paysValue}`);
            }
          })
          .catch(error => {
            console.error('Error fetching country information:', error);
          });

        fetchPromises.push(fetchPromise);
      }
    }
    Promise.all(fetchPromises)
      .then(() => {
        console.log('All flag requests completed.');
        this.flagInfoArray = flagInfoArray;
      })
      .catch(finalizationError => {
        console.error('Error during finalization:', finalizationError);
      });
  }


  public find_employeur_by_Employer() {
    let Mc2 = this.FormsBadgs.value.Mc2;
    let Mc = this.FormsBadgs.value.Mc;
    this.ServicesEmployeur.get_employeur_by_filtre2(Mc, Mc2).subscribe({
      next: (data) => {
        this.employeur = data;
        data.forEach((element: { id: number; }) => {
          this.ServicesEmployeur.Get_All_Employeur_By_Id(element.id).subscribe({
            next : (r) => {
              r.forEach((s: { [x: string]: any; }) => {
                for(this.i = 1 ; this.i<=10 ; this.i++){
                  if (r[`langue${this.i}`] !== null && r[`langue${this.i}`] !== undefined) {
                    s[`langue${this.i}`]
                    this.paysValue2.push(s[`langue${this.i}`]);
                    alert("data2 : "+this.paysValue2.length)
                  }
                }
              });
              for(this.i = 1 ; this.i<=10 ; this.i++)
              {
                if (r[`langue${this.i}`] !== null && r[`langue${this.i}`] !== undefined) {
                  // this.paysValue2.push(r[`langue${this.i}`]);
                  // console.log(typeof(this.paysValue2));
                  
                const fetchPromises: Promise<void>[] = [];
                const flagInfoArray: { country: string, flagUrl: string }[] = [];
                 let paysValue = r[`langue${this.i}`]
                 if (paysValue) {                  
                  const apiUrl = 'https://restcountries.com/v3.1/name/' + paysValue;
                  const fetchPromise = fetch(apiUrl)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      return response.json();
                    })
                    .then(data => {
                      const countryData = data[0];
                      if (countryData.flags && countryData.flags.svg) {
                        const flagUrl = countryData.flags.svg;
                        flagInfoArray.push({ country: paysValue, flagUrl: flagUrl });
                        console.log(`The flag of ${paysValue} can be found at: ${flagUrl}`);
                      } else {
                        console.log(`Flag information not available for ${paysValue}`);
                      }
                    })
                    .catch(error => {
                      console.error('Error fetching country information:', error);
                    });

                  fetchPromises.push(fetchPromise);
                }
                Promise.all(fetchPromises)
                .then(() => {
                  console.log('All flag requests completed.');
                  this.flagInfoArray = flagInfoArray;
                })
                .catch(finalizationError => {
                  console.error('Error during finalization:', finalizationError);
                });
              }
              }
            }
          });
        });
        }
      });
  }




















  public printBadg() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.Badge.nativeElement, {
      callback: (doc) => {
        pdf.save("Badge.pdf")
      },
    })
  }
  AddNumber() {
    this.number_of_badge++
  }
  LossNumber() {
    this.number_of_badge--
  }

  public generateUniqueQrCode(id: number): any {
    id = this.ServicesEmployeur.Id_Employeur
    const uniqueId = this.generateUniqueQrCode(id);

    const qrData = 'yourPrefix_' + uniqueId
    return qrData;
  }
  onImageLoad(event: Event) {
    console.log('Image chargée avec succès :', event);
  }
  public exportAllToPDF(pages: HTMLElement, pdfOptions: any) {
    const doc = new jsPDF({
      unit: 'px',
      format: pdfOptions.pageFormat === 'A5' ? [595, 842] : [842, 1191]
      // format : pdfOptions.setFontsize ''
    });

    html2canvas(pages).then(canvas => {
      const imageData = canvas.toDataURL('image/png');

      // doc.add(imageData, 'PNG', 0, 0);
      try {
        doc.addImage(imageData, 'JPG', 0, 0, 0, 0);
        doc.save('pdf-export');
      } catch (erreur) {
        console.error('Erreur lors de l\'ajout de l\'image au PDF :', erreur);
      }

      doc.save('pdf-export');

    });
  }



  public Generate_Flags_img() {
    var data = document.getElementById("idFlags");
    if (data) {
      html2canvas(data).then(canvas => {
        var imgWidth = 300;
        var pageHeight = 100;
        var imgHeight = canvas.height * imgWidth / canvas.width;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        var position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Flags.pdf');
      });
    }

  }


  change_by_generate_employe() {
    let Changer = this.FormsBadgs.value.Changer
    if (Changer == "EM") {
      this.Generate.nativeElement.style.display = "none"
      this.Filtre.nativeElement.style.pointerEvents = 'auto'
    } else if (Changer == "GN") {
      this.Generate.nativeElement.style.display = ""
      this.Filtre.nativeElement.style.pointerEvents = 'none'
    }
  }
}
