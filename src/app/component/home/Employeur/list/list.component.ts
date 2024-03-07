import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
import {jsPDF} from 'jspdf';
import { zipAll } from 'rxjs';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  FormsGroups!: FormGroup

  @ViewChild('Table_Employeur_PDF' , {static : false}) Table_Employeur_PDF!: ElementRef;

  employeur!: Array<any>
  Img_Asc : Boolean = false
  Img_Desc : Boolean = false

  MsgError!: String

  TotalEmployeur : number = 0
  Tab_id_Employeur: Array<any> = [];

  Btn_Profile: boolean = true
  EventCheckBox: boolean = false
  FirstCheckEvent: boolean = false
  clickHandler: boolean = false
  TdChangeColor: boolean = false
  isTrueOrNot: boolean = false




  id_empl: Number | undefined

  Department!: Array<any>
  Etat!: Array<any>
  Services!: Array<any>


  page: number = 0
  size: number = 10
  totalPage: number = 0
  spinner : boolean = false



  constructor(public EmployeurServices: EmployeurServiceService, private fb: FormBuilder, private el: ElementRef) { }

  ngOnInit(): void {

    this.FormsGroups = this.fb.group({
      Mc: this.fb.control(null),
      McSearch: this.fb.control(null),
      Mc2: this.fb.control(null),
      Mc3: this.fb.control(null)
    })

    this.GoToPage(this.page)
    // setInterval(()=>{
    //   this.GoToPage(this.page)
    // },2000)

    // this.get_employeur()
    this.find_Department()
    this.find_Etat()

  }

  public Show_Profile_Employeur(id: number) {
    this.EmployeurServices.Id_Employeur = id
    this.EmployeurServices.Btn_Show_Profile = true
  }

  public get_employeur() {
    this.EmployeurServices.getPageEmployeur(this.page , this.size).subscribe({
      next: (data) => {
        this.employeur = data.employeur
        this.totalPage = data.totalPage2
      },
      error: (err) => {
        this.MsgError = err
      },
    })
  }

  public Delete_Employe(id: number) {
    this.EmployeurServices.Btn_Delete = true
    this.EmployeurServices.id_employe = id
    if (this.EmployeurServices.id_employe) {
      return this.GoToPage(this.page)
    }
  }

  public Update_Employe(id: number) {
    this.EmployeurServices.Btn_Update_Profile = true
    this.EmployeurServices.id_employe = id

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

  public find_Etat() {
    this.EmployeurServices.get_etat().subscribe({
      next: (data) => {
        this.Etat = data
        console.log(this.Etat)
      },
      error: (err) => {
        this.MsgError = err
        console.log(err);

      },
    })
  }
  public find_Services() {
    let Mc = this.FormsGroups.value.Mc
    // alert(Mc)
    this.EmployeurServices.get_services(Mc).subscribe({
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


  public SearchForEmployeur() {
    let McSearch = this.FormsGroups.value.McSearch
    if (McSearch == "") return this.get_employeur()
    if(McSearch)
    {
       this.EmployeurServices.check_mat_if_exist(McSearch).subscribe({
        next: (data) => {
          if(data != McSearch)
          {
            this.EmployeurServices.Btn_Data_Not_Found = true
          }
        },
      })
    }
    if (McSearch != undefined) {
      return this.EmployeurServices.get_employeur_by_search(McSearch).subscribe({
        next: (data) => {
          this.employeur = data
        },
        error: (err) => {
          this.MsgError = err
          console.log(err);
        },
      })
    }

  }

  public find_By_Filtre() {
    let Mc = this.FormsGroups.value.Mc
    let Mc2 = this.FormsGroups.value.Mc2
    let Mc3 = this.FormsGroups.value.Mc3
    if (Mc !== undefined && Mc2 !== undefined && Mc3 !== undefined) {
      this.EmployeurServices.get_employeur_by_filtre(Mc, Mc2,Mc3).subscribe({
        next: (data) => {
          this.employeur = data
          console.log(this.employeur);

        },
        error: (err) => {
          this.MsgError = err
          console.log(err);
        },
      })
    }
    if (Mc !== undefined && Mc2 !== undefined && Mc3 === undefined) {
      return this.get_employeur()
    }

  }

  find_by_employeur(event: Event, id: number) {
    this.id_empl = id;
    const check = event.target as HTMLInputElement;
    if (check) {
      this.TotalEmployeur += check.checked ? 1 : -1;
    }
  }
  Checked_all_employeur(event: Event)
  {
    const check1 = event.target as HTMLInputElement;
    if(check1.checked)
    {
      this.EmployeurServices.get_total_employeur().subscribe({
        next : (data) =>{
          this.TotalEmployeur = data-1
          this.TdChangeColor = true
          this.isTrueOrNot = true
          const check = event.target as HTMLInputElement;
          if (check) {
            this.TotalEmployeur += check.checked ? 1 : -1;
          }
        }
      }
      )
    }
    if(!check1.checked){
      this.TotalEmployeur = 0
      this.isTrueOrNot = false
      this.TdChangeColor = false
    }

  }

  public GoToPage(i: number) {
    this.page = i
    this.EmployeurServices.getPageEmployeur(i, this.size).subscribe({
      next: (data) => {
        this.employeur = data.product
        this.totalPage = data.totalPage2
      },
      error: (err) => {
        this.MsgError = err
      },
    })
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPage }, (_, i) => i);
  }
  getDisplayedPages(): number[] {
    const displayedPages = [];
    const numPagesToDisplay = 5;

    let start = this.page - numPagesToDisplay;
    let end = this.page + numPagesToDisplay;

    if (start < 0) {
      start = 0;
    }
    if (end >= this.totalPage) {
      end = this.totalPage;
    }
    for (let i = start; i < end; i++) {
      displayedPages.push(i);
    }

    return displayedPages;
  }





public Order_By_Matricul_Desc()
{
return this.EmployeurServices.get_employeur_order_by_desc().subscribe({
  next : (data) => {
    if(data)
    if(data)
    {
      this.Img_Asc = false
      this.Img_Desc = true
    }
    this.employeur = data
  },
  error : (err) => {
    this.MsgError = err
  },
})
}
public Order_By_Matricul_Asc()
{
  return this.EmployeurServices.get_employeur_order_by_asc().subscribe({
    next : (data) => {
      if(data)
      {
        this.Img_Asc = true
        this.Img_Desc = false
      }
      this.employeur = data
    },
    error : (err) => {
      this.MsgError = err
    },
  })
}

public Order_By_Matricul()
{
  this.Order_By_Matricul_Asc()
  this.Order_By_Matricul_Desc()
}




public print__employeur()
{
  let pdf = new jsPDF('p','pt','a4')
  let styles = {
    fontSize : 12 , fontStyle : 'normal'
  }
  pdf.html(this.Table_Employeur_PDF.nativeElement , {
    callback : (pdf) =>{
      pdf.save("data.pdf")
    },
    y : 20 , x : 20
  });
}

Func_Cancel_Filtre(){
  this.GoToPage(this.page)
  let Mc = this.FormsGroups.value.Mc
  let Mc2 = this.FormsGroups.value.Mc2
  let Mc3 = this.FormsGroups.value.Mc3
}

}









