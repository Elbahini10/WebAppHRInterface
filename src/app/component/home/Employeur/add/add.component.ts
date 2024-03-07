import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios from 'axios';
import { empty } from 'rxjs';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { FileHandle } from 'src/app/model/file-handle.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  [x: string]: any;
  forms_employeur!: FormGroup;
  number_of_badge: number = 1;
  start: number = 1;
  end: number = 10;
  selectedFile!: File;
  flags: any;
  Date_Employeur: any;
  divSpinner: boolean = false;

  range(): number[] {
    let start = this.start;
    let end = this.end;
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  range3(): number[] {
    let start = this.start;
    let end = this.number_of_badge;
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  range2(): number[] {
    let start = this.start;
    let end = this.number_of_badge;
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  Assurance: boolean = false;
  Enfant: boolean = false;
  ChangeToInput: boolean = false;
  ChangeToInputEtat: boolean = false;
  ChangeToInputFonction: boolean = false;
  url!: String ;
  urlAnthropometrique!: String ;
  urlDiplomes!: String ;
  urlCV!: String ;
  // TodayDate : Date = new Date()

  MsgError!: String;
  MsgError2!: String;
  MsgError3!: String;
  MsgValide!: String;
  Department!: Array<any>;
  Etat!: Array<any>;
  Fonction!: Array<any>;
  private generatedMatricules: number[] = [];

  countries: any[] = [];
  ChoseCountry = {};
  flagInfoArray: { country: string; flagUrl: string }[] | undefined;
  Infos_Badgs!: {
    Firstname: any;
    Lastname: any;
    Fonction: any;
    Flags: {
      Flags1: any;
      Flags2: any;
      Flags3: any;
      Flags4: any;
      Flags5: any;
      Flags6: any;
      Flags7: any;
      Flags8: any;
      Flags9: any;
      Flags10: any;
    };
  };
  pdfUrl = '';

  registrationnumber!: number;

  constructor(
    private fb: FormBuilder,
    private EmployeurServices: EmployeurServiceService,
    private router: Router,
    private sanitize: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.forms_employeur = this.fb.group({
      mat: this.fb.control(null),
      firstname: this.fb.control(null),
      lastname: this.fb.control(null),
      datebirth: this.fb.control(null),
      cin: this.fb.control(null),
      img: this.fb.control(null),
      familySituation: this.fb.control(null),
      numberChildren: this.fb.control(null),
      anthropometric: this.fb.control(null),
      certificates: this.fb.control(null),
      rib: this.fb.control(null),
      banque: this.fb.control(null),
      department: this.fb.control(null),
      fonction: this.fb.control(null),
      resume: this.fb.control(null),
      etat: this.fb.control(null),
      cnss: this.fb.control(null),
      city: this.fb.control(null),
      phone: this.fb.control(null),
      contry: this.fb.control(null),
      placeBirths: this.fb.control(null),
      adress: this.fb.control(null),
      datestartwork: this.fb.control(null),

      NB: this.fb.control(null),

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
    this.createMatricule();
    this.Func_Pays_API();
    this.find_Department();
    this.find_Etat();
  }

  public find_Department() {
    this.EmployeurServices.get_departement().subscribe({
      next: (data) => {
        this.Department = data;
      },
      error: (err) => {
        this.MsgError = err;
        console.log(err);
      },
    });
  }
  public find_Etat() {
    this.EmployeurServices.get_etat().subscribe({
      next: (data) => {
        this.Etat = data;
      },
      error: (err) => {
        this.MsgError = err;
        console.log(err);
      },
    });
  }
  public find_Services() {
    let department = this.forms_employeur.value.department;
    this.EmployeurServices.get_services(department).subscribe({
      next: (data) => {
        this.Fonction = data;
      },
      error: (err) => {
        this.MsgError = err;
        console.log(err);
      },
    });
  }
  on_submit_forms_employeur() {
    let registrationnumber = this.forms_employeur.value.mat;
    let firstname = this.forms_employeur.value.firstname;
    let lastname = this.forms_employeur.value.lastname;
    let datebirth = this.forms_employeur.value.datebirth;
    let cin = this.forms_employeur.value.cin;
    let img = this.forms_employeur.value.img;
    let familySituation = this.forms_employeur.value.familySituation;
    let numberChildren = this.forms_employeur.value.numberChildren;
    let anthropometric = this.forms_employeur.value.anthropometric;
    let certificates = this.forms_employeur.value.certificates;
    let rib = this.forms_employeur.value.rib;
    let banque = this.forms_employeur.value.banque;
    let department = this.forms_employeur.value.department;
    let fonction = this.forms_employeur.value.fonction;
    let resume = this.forms_employeur.value.resume;
    let etat = this.forms_employeur.value.etat;
    let cnss = this.forms_employeur.value.cnss;
    let city = this.forms_employeur.value.city;
    let phone1 = this.forms_employeur.value.phone;
    let contry = this.forms_employeur.value.contry;
    let placeBirths = this.forms_employeur.value.placeBirths;
    let adress = this.forms_employeur.value.adress;
    let datestartwork = this.forms_employeur.value.datestartwork;
    let phone = '+212 ' + phone1;
    let langue1 = this.forms_employeur.value.pays_1;
    let langue2 = this.forms_employeur.value.pays_2;
    let langue3 = this.forms_employeur.value.pays_3;
    let langue4 = this.forms_employeur.value.pays_4;
    let langue5 = this.forms_employeur.value.pays_5;
    let langue6 = this.forms_employeur.value.pays_6;
    let langue7 = this.forms_employeur.value.pays_7;
    let langue8 = this.forms_employeur.value.pays_8;
    let langue9 = this.forms_employeur.value.pays_9;
    let langue10 = this.forms_employeur.value.pays_10;

    const data = {
      registrationnumber,
      firstname,
      lastname,
      datebirth,
      familySituation,
      numberChildren,
      cin,
      img,
      department,
      fonction,
      anthropometric,
      rib,
      banque,
      etat,
      cnss,
      resume,
      datestartwork,
      certificates,
      city,
      phone,
      contry,
      placeBirths,
      adress,
      langue1,
      langue2,
      langue3,
      langue4,
      langue5,
      langue6,
      langue7,
      langue8,
      langue9,
      langue10,
    };

    if (
      registrationnumber == null &&
      firstname == null &&
      lastname == null &&
      datebirth == null &&
      familySituation == null &&
      cin == null &&
      department == null &&
      fonction == null &&
      rib == null &&
      banque == null &&
      etat == null &&
      city == null &&
      phone == null &&
      contry == null &&
      placeBirths == null &&
      adress == null &&
      datestartwork == null
    ) {
      this.MsgError = 'Vous devez remplir tous les champs marqués * ';
    } else {
      this.EmployeurServices.check_mat(registrationnumber).subscribe({
        next: (e) => {
          if (!e) {
            this.EmployeurServices.check_cin_if_exist(cin).subscribe({
              next: (g) => {
                if (!g) {
                  this.EmployeurServices.Create_Employeur(data).subscribe(
                    (d) => {
                      this.divSpinner = true;
                      this.router.navigateByUrl('home/ListEmploye');
                    },
                    (err) => {
                      this.MsgError = err;
                    }
                  );
                } else {
                  this.MsgError = 'La CIN que vous avez saisi existe déjà ! ';
                }
              },
            });
          } else {
            this.MsgError =
              "Le numéro d'immatriculation que vous avez saisi existe déjà ! ";
          }
        },
      });
    }
  }
  public check_mat_if_existe() {
    let registrationnumber = this.forms_employeur.value.mat;
    // alert(registrationnumber)
    this.EmployeurServices.check_mat_if_exist(registrationnumber).subscribe({
      next: (e) => {
        if (e) {
        } else {
          this.MsgError2 =
            "Le numéro d'immatriculation que vous avez saisi existe déjà ! ";
        }
      },
    });
  }
  public check_Cin_if_existe() {
    let cin = this.forms_employeur.value.cin;
    this.EmployeurServices.check_cin_if_exist(cin).subscribe({
      next: (x) => {
        if (x) {
          this.MsgError3 = 'La CIN que vous avez saisi existe déjà  ! ';
        }
      },
    });
  }
  public createMatricule(): number {
    let diff: number;

    do {
      let mat = Math.random();
      diff = Math.round(9999 * mat);
    } while (this.generatedMatricules.includes(diff));
    this.generatedMatricules.push(diff);
    console.log(diff);
    this.registrationnumber = diff;

    return diff;
  }

  //   public onFileSelected(event: any) {
  //     let fileType = event.target.files[0].type;
  //     if (fileType.match("image/jpeg")) {
  //         let reader = new FileReader();
  //         reader.readAsDataURL(event.target.files[0]);
  //         reader.onload = (event: any) => {
  //             this.url = event.target.result;
  //         };
  //     }
  // }

  public onFileSelected(event: any) {
    let fileType = event.target.files[0].type;

    if (fileType.match('image/jpeg')) {
        let reader = new FileReader();
        let selectedFile = event.target.files[0];
        reader.onload = (event: any) => {
            let imgDataUrl = event.target.result;
            this.url = imgDataUrl;
        };
        reader.readAsDataURL(selectedFile);
    }
}
  public onFileSelectedFicheAnthropometrique(event: any) {
    let fileType = event.target.files[0].type;

    if (fileType.match('image/jpeg')) {
        let reader = new FileReader();
        let selectedFile = event.target.files[0];
        reader.onload = (event: any) => {
            let imgDataUrl = event.target.result;
            this.urlAnthropometrique = imgDataUrl;
        };
        reader.readAsDataURL(selectedFile);
    }
}
  public onFileSelectedDiplome(event: any) {
    let fileType = event.target.files[0].type;

    if (fileType.match('image/jpeg')) {
        let reader = new FileReader();
        let selectedFile = event.target.files[0];
        reader.onload = (event: any) => {
            let imgDataUrl = event.target.result;
            this.urlDiplomes = imgDataUrl;
        };
        reader.readAsDataURL(selectedFile);
    }
}
  public onFileSelectedCV(event: any) {
    let fileType = event.target.files[0].type;

    if (fileType.match('image/jpeg')) {
        let reader = new FileReader();
        let selectedFile = event.target.files[0];
        reader.onload = (event: any) => {
            let imgDataUrl = event.target.result;
            this.urlCV = imgDataUrl;
        };
        reader.readAsDataURL(selectedFile);
    }
}


  onSubmit(): void {
    this.EmployeurServices.uploadImage(this.selectedFile).subscribe(
      (response) => {
        console.log('Image téléchargée avec succès', response);
      },
      (error) => {
        console.error("Erreur lors du téléchargement de l'image", error);
      }
    );
  }

  public enebal_assurance() {
    this.Assurance = true;
  }
  public disabel_assurance() {
    this.Assurance = false;
  }
  public Enable_Enfant() {
    this.Enfant = true;
  }
  public Disabel_Enfant() {
    this.Enfant = false;
  }

  public Add_New_Catg() {
    this.ChangeToInput = true;
  }

  public Retrun_Catg() {
    this.ChangeToInput = false;
  }

  public Add_New_Etat() {
    this.ChangeToInputEtat = true;
  }

  public Retrun_Etat() {
    this.ChangeToInputEtat = false;
  }

  public Add_New_Fonction() {
    this.ChangeToInputFonction = true;
  }

  public Retrun_Fonction() {
    this.ChangeToInputFonction = false;
  }

  Fun_NB_Pays() {
    let numero = this.forms_employeur.value.NB;
    this.number_of_badge = numero;
  }

  public Func_Pays_API() {
    const url = 'https://restcountries.com/v3.1/all';

    axios
      .get(url)
      .then((response) => {
        this.countries = response.data;
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }
}
