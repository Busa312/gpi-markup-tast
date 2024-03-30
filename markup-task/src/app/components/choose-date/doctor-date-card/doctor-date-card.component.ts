import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDoctor} from "../../../Mock/mock-api.service";
import {LanguageService} from "../../../services/language.service";


@Component({
  selector: 'app-doctor-date-card',
  templateUrl: './doctor-date-card.component.html',
  styleUrl: './doctor-date-card.component.scss'
})
export class DoctorDateCardComponent{
  @Input() doctor!: IDoctor;
  @Input() day: number = 0;
  @Input() clickedSlotsArray: IClickedSlot[] = [];
  @Input() date: Date = new Date();
  @Input() address: {address: string, addressEn: string} = {address: '', addressEn: ''};
  @Output() clickedSlot = new EventEmitter<IClickedSlot>();
  isEn: boolean = false;

  constructor(private languageService: LanguageService) {
    this.languageService.isEnglish.subscribe({
      next: val => this.isEn = val
    })
  }

  getNameLocal(obj: any) {
    return this.isEn? obj.nameEn: obj.name;
  }

  onTimeSlotClick(slot: string) {
    if (this.clickedSlotsArray.filter(val => val.slot === slot && val.doctor.id === this.doctor.id && val.date.getDate() === this.date.getDate()).length>0) {
      return;
    }
    this.clickedSlot.emit({doctor: this.doctor, slot: slot, date: this.date});
  }

  checkClicked(slot: string) {
    return this.clickedSlotsArray.filter(val => val.slot === slot && val.doctor.id === this.doctor.id && this.date === val.date).length > 0;
  }

}

export interface IClickedSlot {
  doctor: IDoctor,
  slot: string,
  date: Date
}
