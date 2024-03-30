import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {StepperComponent} from "./components/stepper/stepper.component";
import {RouterModule} from "@angular/router";
import {MatRadioButton, MatRadioGroup, MatRadioModule} from "@angular/material/radio";
import { FooterComponent } from './components/footer/footer.component';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    StepperComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatIcon,
    MatButton
  ],
  exports: [
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    StepperComponent,
    MatRadioModule,
    FormsModule,
    FooterComponent
  ]
})
export class SharedModule { }
