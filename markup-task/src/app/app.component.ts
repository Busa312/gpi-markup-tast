import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormService} from "./services/form.service";
import {LanguageService} from "./services/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isEn = true;
  constructor(private translateService: TranslateService,
              private langService: LanguageService,
              private formService: FormService) {
    this.translateService.use('en');
    this.formService.init();

  }

  changeLanguage() {
    this.translateService.use(this.isEn? 'ge': 'en');
    this.isEn = !this.isEn;
    this.langService.isEnglish.next(this.isEn);
  }
}
