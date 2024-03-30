import {Component} from '@angular/core';
import {Stepper} from "../../shared/components/stepper/stepper.component";
import {FormService} from "../../services/form.service";
import {Router} from "@angular/router";
import {ConsultationTypes} from "../choose-type/choose-type.component";

@Component({
  selector: 'app-consultation-with',
  templateUrl: './consultation-with.component.html',
  styleUrl: './consultation-with.component.scss'
})
export class ConsultationWithComponent {
  stepper: Stepper = {
    maxWidth: 0,
    stepItems: []
  }
  checkedObject = {
    private: false,
    specialist: false,
    machinery: false
  }

  checkedWith: ConsultationWith | null = null;
  disableRemote = false;


  constructor(private formService: FormService,
              private router: Router) {
    if (this.formService.consultationType === null) {
      this.router.navigate(['home']);
    }
    if(this.formService.consultationType === ConsultationTypes.Video || this.formService.consultationType === ConsultationTypes.Phone) {
      this.disableRemote = true;
    }

    if (this.formService.checkedWith !== null) {
      this.check(this.formService.checkedWith);
    }

    this.formService.setActiveStep('consultationWith')
    this.stepper = this.formService.stepper;
  }

  check(value: ConsultationWith) {
    if (value !== ConsultationWith.Private && this.disableRemote) {
      return
    }
    this.checkedWith = value;
    switch (value) {
      case ConsultationWith.Private:
        this.checkedObject.machinery = false;
        this.checkedObject.specialist = false;
        this.checkedObject.private = true;
        break;
      case ConsultationWith.Specialist:
        this.checkedObject.machinery = false;
        this.checkedObject.private = false;
        this.checkedObject.specialist = true;
        break;
      case ConsultationWith.Machinery:
        this.checkedObject.private = false;
        this.checkedObject.specialist = false;
        this.checkedObject.machinery = true;
        break;
    }
  }

  onBack() {
    this.router.navigate(['type']);
  }

  onNext() {
    this.formService.checkedWith = this.checkedWith;
    this.router.navigate(['select-hospital'])
  }

  protected readonly ConsultationWith = ConsultationWith;
}

export enum ConsultationWith {
  Private,
  Specialist,
  Machinery
}
