import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Single_patchModel} from "../shared/single_patch.model";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#FFF0CE';
  }
  patch = new Single_patchModel(0,0,0,0);

  result = 0;
  onSubmit(form: NgForm) {
    this.patch.price = form.value.price;
    this.patch.size = form.value.size;
    this.patch.buttons = form.value.buttons;
    this.patch.billings = form.value.billings;

    this.result = (this.patch.buttons * this.patch.billings) - this.patch.price + (this.patch.size * 2)

  }
}
