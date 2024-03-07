import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RemboursementServicesService } from 'src/app/Service/Remboursement/remboursement-services.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  MsgError: String | undefined;
  MsgValid: String | undefined;
  Destination!: Array<any>;
  DestinationTypes2: String | undefined
  Months: String | undefined
  date: Date = new Date()
  Result!: Array<any>
  Total: number = 0
  formsDestination!: FormGroup
  constructor(private ServicesRemboursementMutuel: RemboursementServicesService,
    private fb: FormBuilder) { }
  ngOnInit(): void {
    this.formsDestination = this.fb.group({
      Months: this.fb.control(null)
    })
    // this.get_all_Destination()
  }

  public get_all_Destination() {
    this.Months = this.formsDestination.value.Months
    this.ServicesRemboursementMutuel.get_total_rembourcement_by_month(this.Months).subscribe({
      next: (r) => {
        this.Destination = r
        const sum = r.reduce((accumulator: number, currentValue:
          { montent1: number }) => accumulator + currentValue.montent1, 0);
        this.Total = sum
      }
    })
  }




}




