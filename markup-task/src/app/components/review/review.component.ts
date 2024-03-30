import { Component } from '@angular/core';
import {FormService} from "../../services/form.service";
import {Router} from "@angular/router";
import {Stepper} from "../../shared/components/stepper/stepper.component";
import {IClickedSlot} from "../choose-date/doctor-date-card/doctor-date-card.component";
import {LanguageService} from "../../services/language.service";
import {ICustomer, IHospital, MockApiService} from "../../Mock/mock-api.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  stepper: Stepper = {
    maxWidth: 0,
    stepItems: []
  };
  isEn: boolean = false;
  bookedSlots: IClickedSlot[] = [];
  hospital!: IHospital;
  insured!: ICustomer;
  notSubmitted: boolean = true;
  monthsShort = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  constructor(private formService: FormService,
              private languageService: LanguageService,
              private mockApi: MockApiService,
              private router: Router) {
    if(this.formService.bookedSlots.length <=0) {
      this.router.navigate(['home']);
    }
    this.languageService.isEnglish.subscribe(val => this.isEn = val);
    this.mockApi.getHospitals({name:'', city:''}).subscribe({
      next: val => {
        this.hospital = val.filter(h => h.id === this.formService.chosenHospitalId)[0];
      }
    })
    this.mockApi.getAllCustomers().subscribe({
      next: val => {
        this.insured = val.filter(v => v.id === this.formService.chosenCustomerId)[0];
      }
    })
    this.formService.setActiveStep('review');
    this.stepper = this.formService.stepper;
    this.bookedSlots = this.formService.bookedSlots;
  }

  onBack() {
    this.router.navigate(['select-date'])
  }

  onSubmit() {
    this.notSubmitted = false;
  }

  onSubmittedButton() {
    this.formService.clear();
    this.router.navigate(['home']);
  }
}
