import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss'
})
export class StepperComponent implements OnInit{
  @Input() stepper: Stepper = {
    stepItems: [
    ],
    maxWidth: 0
  }
  stepItems: StepItem[] = [];
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.stepItems = this.stepper.stepItems
  }

  isConfirmed(item: StepItem): boolean {
    let itemIndex = this.stepItems.indexOf(item);
    let activeItemIndex = this.stepItems.indexOf(this.stepItems.find(x => x.active) as StepItem);
    return itemIndex < activeItemIndex;
  }

  onIconClick(item: StepItem) {
    if (this.isConfirmed(item)) {
      this.router.navigateByUrl(item.url || '');
    }
  }

}


export interface StepItem {
  title: string;
  active: boolean;
  url?: string;
}

export interface Stepper {
  stepItems: StepItem[];
  maxWidth: number;
}
