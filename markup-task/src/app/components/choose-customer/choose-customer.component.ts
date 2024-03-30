import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormService} from "../../services/form.service";
import {Stepper} from "../../shared/components/stepper/stepper.component";
import {Router} from "@angular/router";
import {ICustomer, MockApiService} from "../../Mock/mock-api.service";
import {TranslateService} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-choose-customer',
  templateUrl: './choose-customer.component.html',
  styleUrl: './choose-customer.component.scss'
})
export class ChooseCustomerComponent implements OnInit, OnDestroy {
  footerZeroOpacity: boolean = false;
  stepper: Stepper;
  forMe: ForMeOrOther = ForMeOrOther.ForMe;
  forMeOrOtherTypes = ForMeOrOther;
  customers: ICustomer[] = [];
  isEn: boolean = false;
  activeCustomer: number = 0;
  birthDate: string = ''
  identificationNumber: string = '';

  subscriptions: Subscription[] = [];
  constructor(private formService: FormService,
              private router: Router,
              private MockApi: MockApiService,
              private langService: LanguageService) {
    this.formService.setActiveStep('chooseCustomer')
    this.stepper = this.formService.stepper;
    this.formService.consultationType = null;
    this.formService.checkedWith = null;
    if (this.formService.chosenCustomerId) {
      this.activeCustomer = this.formService.chosenCustomerId;
    }
  }

  ngOnDestroy(): void {
        this.subscriptions.forEach(val => val.unsubscribe());
    }

  ngOnInit() {
    this.subscriptions.push(this.langService.isEnglish.subscribe(val => this.isEn = val));
    this.MockApi.getCustomers().subscribe(
      val => {
        this.customers = val;
      }
    );
  }

  checkCustomer() {
    if (this.birthDate && this.identificationNumber) {
      this.MockApi.getAllCustomers().subscribe(
        value => {
          let customer = value.filter(val => val.identificationNumber === this.identificationNumber && this.birthDate === val.birthDate)[0];
          if (customer && !this.customers.includes(customer)) {
            this.customers = [customer, ...this.customers];
          }
        }
      )
    }
  }

  next() {
    this.formService.chosenCustomerId = this.activeCustomer;
    this.router.navigate(['type']);
  }

}

export enum ForMeOrOther {
  ForMe  ,
  ForOther
}
