import { Component } from '@angular/core';
import {FormService} from "../../services/form.service";
import {Stepper} from "../../shared/components/stepper/stepper.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrl: './choose-type.component.scss'
})
export class ChooseTypeComponent {
  consultationType: ConsultationTypes | null = null;

  stepper: Stepper;
  constructor(private formService: FormService,
              private router: Router) {
    if (!this.formService.chosenCustomerId) {
      this.router.navigate(['home']);
    }
    if(this.formService.consultationType !== null) {
      this.consultationType = this.formService.consultationType;
    }
    this.formService.checkedWith = null;
    this.formService.setActiveStep('chooseType');
    this.stepper = this.formService.stepper;
  }

  onNext() {
    this.formService.consultationType = this.consultationType;
    this.router.navigate(['consultation-with']);
  }

  onBack() {
    this.router.navigate(['home'])
  }

  protected readonly ConsultationTypes = ConsultationTypes;
}

export enum ConsultationTypes {
  Phone,
  Visit,
  Video
}
