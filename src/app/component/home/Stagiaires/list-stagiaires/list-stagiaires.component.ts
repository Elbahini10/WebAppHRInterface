import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeurServiceService } from 'src/app/Service/Employeur/employeur-service.service';
import { ServStagiairesService } from 'src/app/Service/Stagiaires/serv-stagiaires.service';

@Component({
  selector: 'app-list-stagiaires',
  templateUrl: './list-stagiaires.component.html',
  styleUrls: ['./list-stagiaires.component.css']
})
export class ListStagiairesComponent implements OnInit
 {
  MsgError : String | undefined
  FormsGroups! : FormGroup

  Department! : Array<any>
  Services! : Array<any>
  School! : Array<any>
  Stagiaires! : Array<any>

  
  page: number = 0
  size: number = 5
  totalPage: number = 0

  Forms_Stagiaires! : FormGroup

  constructor(private fb: FormBuilder, private StagiairesServices: ServStagiairesService, private EmployeurServices: EmployeurServiceService) {}
  ngOnInit(): void {

    this.Forms_Stagiaires = this.fb.group({
      Mc : this.fb.control(null)
    })




      this.GoToPage(this.size)
      this.get_departement()
      this.get_shcool()
  }

  SearchForstagiaires(){}
  find_By_Filtre(){}

  public get_all_stagiaires() 
  {
    this.StagiairesServices.find_all_Stagiaires().subscribe({
      next : (data) => {
        this.Stagiaires = data
        console.log(this.Stagiaires);
        
      },
      error : (err) => {
          this.MsgError = err
      },
    })
  }
  public GoToPage(i: number) {
    this.page = i
    this.StagiairesServices.getPageStagiaires(i, this.size).subscribe({
      next: (data) => {
        this.Stagiaires = data.product
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
    const numPagesToDisplay = 5; // Adjust this number as needed.

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



  
  
  public get_departement() {
    this.EmployeurServices.get_departement().subscribe({
      next: (data) => {
        this.Department = data
      },
      error: (err) => {
        this.MsgError = err
      },
    })
  }

  public find_Services() {
    let Mc = this.Forms_Stagiaires.value.Mc
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

  public get_shcool() {
    this.StagiairesServices.find_all_School().subscribe({
      next: (data) => {
        this.School = data
      },
      error: (err) => {
        this.MsgError = err
      },
    })
  }




}
