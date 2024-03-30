import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  isEnglish = new BehaviorSubject<boolean>(true);

  constructor() { }
}
