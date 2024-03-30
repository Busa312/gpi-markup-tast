import { Injectable } from '@angular/core';
import {StepItem, Stepper} from "../shared/components/stepper/stepper.component";
import {ConsultationTypes} from "../components/choose-type/choose-type.component";
import {ConsultationWith} from "../components/consultation-with/consultation-with.component";
import {IClickedSlot} from "../components/choose-date/doctor-date-card/doctor-date-card.component";

@Injectable({
  providedIn: 'root'
})
export class FormService {
  chosenCustomerId: number = 0;
  consultationType: ConsultationTypes | null = null;
  checkedWith: ConsultationWith | null = null;
  chosenHospitalId: number = 0;
  bookedSlots: IClickedSlot[] = [];

  stepper: Stepper = {
    maxWidth: 0,
    stepItems: []
  };
  constructor() { }

  init() {
    this.stepper = {
      maxWidth: 1170,
      stepItems: [
        {active: true, title: 'chooseCustomer', url: '/home'} as StepItem,
        {active: false, title: 'chooseType', url: '/type'} as StepItem,
        {active: false, title: 'consultationWith', url: '/consultation-with'} as StepItem,
        {active: false, title: 'selectHospital', url: '/select-hospital'} as StepItem,
        {active: false, title: 'chooseDate', url: '/select-date'} as StepItem,
        {active: false, title: 'review', url:'/review'} as StepItem
      ]
    }
  }

  setActiveStep(key: string) {
    this.stepper.stepItems.filter(x => x.active).forEach(x => x.active = false);
    (this.stepper.stepItems.find(x => x.title === key) as StepItem).active = true;
  }

  clear() {
    this.chosenCustomerId = 0;
    this.consultationType = null;
    this.checkedWith = null;
    this.chosenHospitalId = 0;
    this.bookedSlots = [];
  }
}
