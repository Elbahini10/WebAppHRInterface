import { Component, OnInit, TestabilityRegistry } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { first, last } from 'rxjs';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { ListComponent } from '../../list/list.component';

@Component({
  selector: 'app-update-employeur',
  templateUrl: './update-employeur.component.html',
  styleUrls: ['./update-employeur.component.css'],
})
export class UpdateEmployeurComponent implements OnInit {
  test: String = '';

  MsgError!: String;
  Update_Data_Empl!: {};
  Assurance: boolean = false;
  Enfant!: boolean;
  ChangeToInput_One: boolean = true;
  ChangeToInput_Tow: boolean = false;
  selectedFile!: File;
  Department!: Array<any>;
  Etat!: Array<any>;

  BtnFunChangeSituationFamily: boolean = false;
  BtnFunChangeSituationFamily2: boolean = true;

  BtnFunChangeDepartement: boolean = false;
  BtnFunChangeDepartement2: boolean = true;

  Forms_Update!: FormGroup;

  employe = {
    registrationnumber: '',
    firstname: '',
    lastname: '',
    datebirth: '',
    datestartwork: '',
    dateendwork: '',
    familySituation: '',
    numberChildren: '',
    cin: '',
    img: '',
    department: '',
    fonction: '',
    anthropometric: '',
    rib: '',
    banque: '',
    resume: '',
    cnss: '',
    state: '',
    etat: '',
    contry: '',
    city: '',
    placeBirths: '',
    phone: '',
    certificates: '',
    adress: '',
  };


  etat : String = ''

  banques: { value: string; label: string; img: string }[] = [
    { value: 'attijariwafa', label: 'Attijariwafa Bank', img: '' },
    { value: 'banque_populaire', label: 'Banque Populaire du Maroc', img: '' },
    { value: 'bmce', label: 'BMCE Bank', img: '' },
    {
      value: 'societe_generale',
      label: 'Société Générale Maroc',
      img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA0lBMVEX///8ZFxziADIAAAD///0ZFh38/////P///P3BwcL4tMAbFh3IACjlADP//v8XFhxRUFbUAC3MRVwKCBH0tb7NACsoChR/DCnQDjn/+P73///EACj6ssDmADP/9PreATLs///84ui0AC7/8/Xo6Ojs//fuqbzbCDXTCTTZG0LpPV7wt73kW3v/6fW+ACvZX3jKETnRZXraCzvYur9sABl7ECWhY3AOAAAtCBghDhIdERBzYGYeAAAtCRC4w8AfFCIVHB0RHRhsZWkTGyBqcGwrKi1eeRi3AAAESElEQVR4nO3c/1PTSBjH8aTZ7iYt3R53LcduDamtkPrlABVE8E57qP//v3TPBoJ6ScFZmj6x83nPFMYfbPaV7KZ1xmwQIIQQQgghhBBCCCGEEELo109KaaVWSpV/cq9WpY3SNEYamadQ0RsEN29RJNoWXYBA0yh9hdYcGGsDbYO4nWmrA1uM0leojJ1aY2Jdxjgha4tNMULlK5TaTqf6wHA77skc6OnUat9ZqrW1Us3F4d0buttOC7qbU4dirqS1WnsK6TZDc1xIwb3eVkZjoxHSzcZXSHdjAj49elLWa1lHT4lotDS+QmtjeSiOZpOynXY1mR3REoqt9b2Gkj4LZRD3JlmnpU16MX0LCYT3J76I6eYSj3a4ISvbGcV0EWIIIWyzsAchhBByt/3C8UjQP/KF8AT+IkIFIYQQsgYhhBDyByGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8tfg/2QfDNxrkKYbYGSd1NWpeUawwacRsuz2gIPmy4qjdDYuLCp/N9C3ty4PV3N5mxdu5OHSwUpgo8Lyd9pYpc8tdgcc1Kz5Jp8KouOm7uR6XZWf6m6Wpu6u1knr7moNPmF5C8zzDQjd9bs53iaFxedFli/Gu802Ll45ndFB7b300UJdCCd1J7jjgM9f/N58L57n2aB+RUwKof/T6kJrq5R4eVz9VOjkabq7WLz6yzS6AYZ7d3PwapHTCPL0/6PoZMcvhVFWe3+pcUKaAr1x3SqhW1s2Ppl7f2F6sHJ3DzE/WdDXmmy35k4zGbmFpLTvKKRW0grxZFF96zSnz4nObpNCl9A0A+cn4+JgNed50XP7DJnYf38aI60Uo9l+tdNT+nH82gkbQpY7xoj569n+mzf7pzWjmI2EJaHv/jRaSOVuVG/P/qx0Xvw4ezcPfBf5g91tiqPenZ2fl8f8sbO3ghaS9zZRgbC0GIxOLvZqev/+8urig/HeZuvBSqCVH/7eu7y83PunOoiLJFBa+59lTdNbm+BjFFbrf+ov/42uTbxO1A99u4bXF8vl589hvzqK6GNAF1Ba3z2GpI1j+stJ1K9Ewm53ScK1oioJt4WMuY6uwu6QzmolEkq3GZm3UCplbb1w2O32r6Iva/Ws6kt01e93w2WVGCXB1MaPWIc3d8mkbpa6iRqGX3/bRF+HdTO0mKXJ9wNduzAMh8M/NtEwHK4YQOPCsEvIxnOnkk043JBwVc0L6So2mlsI91zCLRDeMrf4GkK4CWH1y8DaYxbyBiGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8gchhBDyByGEEPIHIYQQ8gchhBDyB+FPC+97BJCz7mOFtyVRe0sC3+0Uvu9Z0t6ercGHtiPd1rhPDEIIIYQQQgghhBBCCCGEEELb1X8z64cbXhnyMgAAAABJRU5ErkJggg==',
    },
    { value: 'credit_agricole', label: 'Crédit Agricole du Maroc', img: '' },
    {
      value: 'credit_immobilier_hotelier',
      label: 'CIH Bank (Crédit Immobilier et Hôtelier)',
      img: '',
    },
    {
      value: 'bmci',
      label: "BMCI (Banque Marocaine pour le Commerce et l'Industrie)",
      img: '',
    },
  ];
  BtnFunBanque: boolean = false;
  BtnFunBanque2: boolean = true;
  BtnFunChangeEtat: boolean = false;
  BtnFunChangeEtat2: boolean = true;
  BtnFunChangeCnss: boolean = false;
  BtnFunChangeCnss2: boolean = true;
  // firstname: any;

  constructor(public EmployeurServices: EmployeurServiceService ,  private router : Router) {}

  ngOnInit(): void {
    this.BtnFunChangeSituationFamily2 = true;
    this.get_employe_by_id();
    this.find_Department();
    this.find_Etat();
  }

  public Close_Page_Delete() {
    this.EmployeurServices.Btn_Update_Profile = false;
  }

  public get_employe_by_id() {
    this.EmployeurServices.Get_All_Employeur_By_Id(
      this.EmployeurServices.id_employe
    ).subscribe(
      (data) => {
        this.employe = data;
        console.log(this.employe);
      },
      (err) => {
        this.MsgError = err;
      }
    );
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
    this.ChangeToInput_Tow = true;
    this.ChangeToInput_One = false;
  }

  public Retrun_Catg() {
    this.ChangeToInput_Tow = false;
    this.ChangeToInput_One = true;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
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

  public update_employeur() {
    let id = this.EmployeurServices.id_employe;
    // alert(id)
    const data = {
      registrationnumber: this.employe.registrationnumber,
      firstname: this.employe.firstname,
      lastname: this.employe.lastname,
      placeBirths: this.employe.placeBirths,
      datebirth: this.employe.datebirth,
      cin: this.employe.cin,
      adress: this.employe.adress,
      familySituation: this.employe.familySituation,
      numberChildren: this.employe.numberChildren,
      rib: this.employe.rib,
      banque: this.employe.banque,
      contry: this.employe.contry,
      city: this.employe.city,
      phone: this.employe.phone,
      department: this.employe.department,
      fonction: this.employe.fonction,
      datestartwork: this.employe.datestartwork,
      etat: this.employe.etat,
      cnss: this.employe.cnss,
    };

    return this.EmployeurServices.Update_Employeur_By_Id(id, data).subscribe({
      next: (s) => {
        this.EmployeurServices.getPageEmployeur(1,10);
        this.EmployeurServices.Btn_Update_Profile = false;
      },
      error: (err) => {
        this.MsgError = err;
        // alert(JSON.stringify(this.MsgError));
      },
    });
  }

  FunChangeSituationFamily() {
    this.BtnFunChangeSituationFamily = true;
    this.BtnFunChangeSituationFamily2 = false;
  }
  FunChangeDepartement() {
    this.BtnFunChangeDepartement = true;
    this.BtnFunChangeDepartement2 = false;
  }
  FunDesactiveChangeDepartement() {
    this.BtnFunChangeDepartement = false;
    this.BtnFunChangeDepartement2 = true;
  }
  FunDesactiveChangeSituationFamily() {
    this.BtnFunChangeSituationFamily = false;
    this.BtnFunChangeSituationFamily2 = true;
  }
  FunChangeBanque() {
    this.BtnFunBanque = true;
    this.BtnFunBanque2 = false;
  }
  FunDesactiveBanque() {
    this.BtnFunBanque = false;
    this.BtnFunBanque2 = true;
  }

  ChangeToOpenInputNumber() {
    // let familySituation = this.forms_update_employe.value.familySituation
    // alert(familySituation)
    // if(familySituation != "celibataire")
    // {
    // }
  }

  FunChangeEtat() {
    this.BtnFunChangeEtat = true;
    this.BtnFunChangeEtat2 = false;
  }
  FunDesactiveChangeEtat() {
    this.BtnFunChangeEtat = false;
    this.BtnFunChangeEtat2 = true;
  }
  FunChangeCnss() {
    this.BtnFunChangeCnss = true;
    this.BtnFunChangeCnss2 = false;
  }
  FunDesactiveChangeCnss() {
    this.BtnFunChangeCnss = false;
    this.BtnFunChangeCnss2 = true;
  }
}
