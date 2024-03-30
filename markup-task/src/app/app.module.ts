import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ChooseCustomerComponent } from './components/choose-customer/choose-customer.component';
import { ChooseTypeComponent } from './components/choose-type/choose-type.component';
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import { ConsultationWithComponent } from './components/consultation-with/consultation-with.component';
import {MatCheckbox} from "@angular/material/checkbox";
import { SelectHospitalComponent } from './components/select-hospital/select-hospital.component';
import {MatOption, MatSelect} from "@angular/material/select";
import { ChooseDateComponent } from './components/choose-date/choose-date.component';
import { DoctorDateCardComponent } from './components/choose-date/doctor-date-card/doctor-date-card.component';
import {MatAutocomplete, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseCustomerComponent,
    ChooseTypeComponent,
    ConsultationWithComponent,
    SelectHospitalComponent,
    ChooseDateComponent,
    DoctorDateCardComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MatStepperModule,
    MatButton,
    BrowserAnimationsModule,
    MatIcon,
    MatCheckbox,
    MatSelect,
    MatOption,
    MatAutocomplete,
    MatAutocompleteTrigger
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
