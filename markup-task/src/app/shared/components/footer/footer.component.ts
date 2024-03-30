import {Component, EventEmitter, Input, Output, output} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() width: string = '0px';
  @Input() disableBack = false;
  @Input() disableNext = false;
  @Input() zeroOpacity = false;
  @Input() nextText = 'next';
  @Output() nextEvent = new EventEmitter();
  @Output() backEvent = new EventEmitter();

  onBack() {
    this.backEvent.emit();
  }

  onNext() {
    this.nextEvent.emit();
  }
}
