import {Component, HostListener, OnInit} from '@angular/core';
import {FormService} from "../../services/form.service";
import {Router} from "@angular/router";
import {Stepper} from "../../shared/components/stepper/stepper.component";
import {IDoctor, IHospital, MockApiService} from "../../Mock/mock-api.service";
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService} from "../../services/language.service";
import {ConsultationWith} from "../consultation-with/consultation-with.component";
import {IClickedSlot} from "./doctor-date-card/doctor-date-card.component";

@Component({
  selector: 'app-choose-date',
  templateUrl: './choose-date.component.html',
  styleUrl: './choose-date.component.scss'
})
export class ChooseDateComponent implements OnInit{
  consultationWith: ConsultationWith | null = null;
  stepper: Stepper = {
    maxWidth: 0,
    stepItems: []
  };
  form = new FormGroup({
    hospital: new FormControl(0),
    privateDoctor: new FormControl(''),
    specialization: new FormControl(''),
    specialistDoctor: new FormControl(''),
    analysis: new FormControl(''),
    analysisDoctor: new FormControl('')
  })
  activeDate: Date = new Date();
  dateArr: Date[] = [];
  datesToShow: Date[] = [];
  weekNumber = 0;
  activeWeek = 0;
  hospitals: IHospital[] = [];
  daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  monthsShort = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  allDoctors: IDoctor[] = [];
  doctorsToShow: IDoctor[] = [];
  privateDoctors: IDoctor[] = [];
  specialists: IDoctor[] = [];
  researchDoctors: IDoctor[] = [];
  isEn: boolean = false;
  bookedSlots: IClickedSlot[] = [];
  address: {address: string, addressEn: string} = {address: '', addressEn: ''};

  constructor(private formService: FormService,
              private mockApi: MockApiService,
              private languageService: LanguageService,
              private router: Router) {
    if (!this.formService.chosenHospitalId) {
      this.router.navigate(['home']);
    }
    this.mockApi.getHospitals({city: '', name: ''}).subscribe({
      next: val => {

        const hospital = val.filter(h => h.id === this.formService.chosenHospitalId)[0];
        this.address = {address: hospital.address, addressEn: hospital.addressEn};
      }
    });
    this.languageService.isEnglish.subscribe(val => {
      this.isEn = val;
    });
    this.bookedSlots = this.formService.bookedSlots;
    this.formService.setActiveStep('chooseDate');
    this.stepper = this.formService.stepper;
    this.generateDateArray();
  }

  @HostListener('click', ['$event'])
  pageClick() {
    if (this.weekNumber === this.activeWeek) {
      return;
    }
    this.weekNumber = this.activeWeek;
    this.showDates();
  }

  listenToForm(formName: 'privateDoctor' | 'analysisDoctor' | 'specialistDoctor') {
    this.form.valueChanges.subscribe({
      next: value => {
        const formValue = formName === 'privateDoctor'? value['privateDoctor']: formName === value['analysisDoctor']?  'analysisDoctor' : value['specialistDoctor'];
        if(formValue === 'All free' || formValue === 'ყველა თავისუფალი') {
          this.doctorsToShow = this.allDoctors;
        }
        else {
          this.doctorsToShow = this.allDoctors.filter(val => val.name.toLowerCase() === formValue?.toLowerCase() || val.nameEn.toLowerCase() === formValue?.toLowerCase());
        }
      }
    })
  }

  ngOnInit() {
    this.consultationWith = this.formService.checkedWith
    this.disableFormControls()
    this.mockApi.getHospitals({name: '', city: ''}).subscribe({
      next: val => {
        this.hospitals = val;
        this.form.controls['hospital'].setValue(this.formService.chosenHospitalId);
        this.form.controls['hospital'].disable();
      }
    }).unsubscribe();

    this.mockApi.getDoctors().subscribe(
      val => {
        this.allDoctors = val.filter(val => val.type === this.consultationWith);
        this.privateDoctors = val.filter(val => val.type === ConsultationWith.Private);
        this.specialists = val.filter(val => val.type === ConsultationWith.Specialist);
        this.researchDoctors = val.filter(val => val.type === ConsultationWith.Machinery);
        this.doctorsToShow = this.allDoctors;
      }
    ).unsubscribe();
  }

  disableFormControls() {
    const controls = this.form.controls;
    controls.analysis.disable();
    controls.specialization.disable();
    switch(this.consultationWith) {
      case ConsultationWith.Private:
        controls.analysisDoctor.disable();
        controls.specialistDoctor.disable();
        this.listenToForm('privateDoctor');
        break;
      case ConsultationWith.Machinery:
        controls.privateDoctor.disable();
        controls.specialistDoctor.disable();
        this.listenToForm('specialistDoctor')
        break;
      case ConsultationWith.Specialist:
        controls.privateDoctor.disable();
        controls.analysisDoctor.disable();
        this.listenToForm('analysisDoctor');
        break;
    }
  }

  showDates() {
    this.datesToShow = [...this.dateArr].slice(7*this.weekNumber, 7 + 7*this.weekNumber);
  }

  private generateDateArray() {
    const today = new Date();
    this.activeDate = today;
    const dateArr: Date[] = [today];
    for(let i = 1; i < 28; i++) {
      const newDate = new Date(today); // Create a copy of 'today'
      newDate.setDate(today.getDate() + i);
      dateArr.push(newDate);
    }

    this.dateArr = dateArr;
    this.showDates();
  }

  onBackCarousel(event: Event) {
    event.stopPropagation();
    if (this.weekNumber === 0) {
      return;
    }
    this.weekNumber--;
    this.showDates();
  }

  onNextCarousel(event: Event) {
    event.stopPropagation();
    if (this.weekNumber === 3) {
      return;
    }
    this.weekNumber ++;
    this.showDates();

  }

  getNameLocal(obj: any) {
    return this.isEn? obj.nameEn: obj.name;
  }

  isDateDisabled(item: Date) {
    return !this.form.controls['privateDoctor'].value && !this.form.controls['specialistDoctor'].value && !this.form.controls['analysisDoctor'].value && item !== this.activeDate;
  }

  setActiveDate(item: Date, event: Event) {
    event.stopPropagation();
    if (this.isDateDisabled(item)) {
      return;
    }
    this.activeWeek = this.weekNumber;
    this.activeDate = item;
  }

  onToday() {
    this.activeDate = this.dateArr[0];
    this.weekNumber = 0;
    this.showDates();
  }

  noEmptySlots(item: Date) {
    return this.allDoctors.filter(val => val.timeSlotsByDays[item.getDate().toString()]?.length > 0).length>0;
  }

  bookNewSlot(slotObj: IClickedSlot) {
    this.bookedSlots = [...this.bookedSlots, slotObj];
  }

  deleteSlot(slot: IClickedSlot) {
    this.bookedSlots = this.bookedSlots.filter(val => val.slot !== slot.slot || slot.doctor.id !== val.doctor.id || slot.date.getDate() !== val.date.getDate())
  }

  hasSlots() {
    let result = false;
    for(let doc of this.doctorsToShow) {
      if (doc.timeSlotsByDays[this.activeDate.getDate()+'']?.length > 0) {
        return true;
      }
    }
    return false;
  }

  onBackStepper() {
    this.router.navigate(['select-hospital']);
  }

  onNextStepper() {
    this.formService.bookedSlots = this.bookedSlots;
    this.router.navigate(['review']);
  }

  protected readonly ConsultationWith = ConsultationWith;
}
