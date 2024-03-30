import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChooseCustomerComponent} from "./components/choose-customer/choose-customer.component";
import {ChooseTypeComponent} from "./components/choose-type/choose-type.component";
import {ConsultationWithComponent} from "./components/consultation-with/consultation-with.component";
import {SelectHospitalComponent} from "./components/select-hospital/select-hospital.component";
import {ChooseDateComponent} from "./components/choose-date/choose-date.component";
import {ReviewComponent} from "./components/review/review.component";

const routes: Routes = [
  {
    path: 'review',
    component: ReviewComponent
  },
  {
    path: 'select-date',
    component: ChooseDateComponent
  },
  {
    path: 'select-hospital',
    component: SelectHospitalComponent
  },
  {
    path: 'consultation-with',
    component: ConsultationWithComponent
  },
  {
    path: 'type',
    component: ChooseTypeComponent
  },
  {
    path: 'home',
    component: ChooseCustomerComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
