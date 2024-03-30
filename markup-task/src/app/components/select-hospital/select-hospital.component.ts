import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormService} from "../../services/form.service";
import {Stepper} from "../../shared/components/stepper/stepper.component";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {IHospital, MockApiService} from "../../Mock/mock-api.service";
import {Subscription} from "rxjs";
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-select-hospital',
  templateUrl: './select-hospital.component.html',
  styleUrl: './select-hospital.component.scss'
})
export class SelectHospitalComponent implements OnInit, OnDestroy{
  stepper: Stepper = {
    maxWidth: 0,
    stepItems: []
  }
  hospitals: IHospital[] = [];
  isEn: boolean = false;

  chosenHospitalId: number = 0;

  cityForm = new FormControl('');
  searchForm = new FormControl('');
  cities = ['tbilisi', 'kutaisi', 'batumi', 'zugdidi'];

  subscriptions: Subscription[] = [];
  constructor(private formService: FormService,
              private mockService: MockApiService,
              private langService: LanguageService,
              private router: Router) {
    this.subscriptions.push(this.langService.isEnglish.subscribe(val => this.isEn = val));
    if (this.formService.checkedWith === null) {
      this.router.navigate(['home']);
    }
    if (this.formService.chosenHospitalId) {
      this.chosenHospitalId = this.formService.chosenHospitalId;
    }
    this.formService.bookedSlots = [];
    this.formService.setActiveStep('selectHospital');
    this.stepper = this.formService.stepper;
  }

  ngOnInit() {
    this.getHospitals(false);
    this.subscriptions.push(this.searchForm.valueChanges.subscribe(
      () => {
        this.getHospitals(true);
      }
    ));
    this.subscriptions.push(this.cityForm.valueChanges.subscribe(
      () => {
        this.getHospitals(true);
      }
    ));
  }

  getHospitals(filter: boolean) {
    const queryObj = {city: '', name: ''};
    if (filter) {
      queryObj.city = this.cityForm.value || '';
      queryObj.name = this.searchForm.value || '';
    }

    this.mockService.getHospitals(queryObj).subscribe((val) => {
      this.hospitals = val;
      this.chosenHospitalId = 0;
    }).unsubscribe();
  }

  onNext() {
    this.formService.chosenHospitalId = this.chosenHospitalId
    this.router.navigate(['select-date']);
  }

  onBack() {
    this.router.navigate(['consultation-with']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(val => val.unsubscribe())
  }

}
