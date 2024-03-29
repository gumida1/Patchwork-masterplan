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
  patch1 = new Single_patchModel(0,0,0,0, 0, false);
  patch2 = new Single_patchModel(0,0,0,0, 0, false);
  patch3 = new Single_patchModel(0,0,0,0, 0, false);

  results:number[]=[];
  result1 = 0;
  result2 = 0;
  result3 = 0;
  color_style = '';
  time_usage = '';
  submited = false;
  onSubmit(form: NgForm) {
    this.submited = true;
    this.patch1.price = form.value.price1;
    this.patch1.size = form.value.size1;
    this.patch1.buttons = form.value.buttons1;
    this.patch1.billings = form.value.billings;
    this.patch1.time = form.value.time1;

    this.patch2.price = form.value.price2;
    this.patch2.size = form.value.size2;
    this.patch2.buttons = form.value.buttons2;
    this.patch2.billings = form.value.billings;
    this.patch2.time = form.value.time2;

    this.patch3.price = form.value.price3;
    this.patch3.size = form.value.size3;
    this.patch3.buttons = form.value.buttons3;
    this.patch3.billings = form.value.billings;
    this.patch3.time = form.value.time3;

    this.time_usage = '';
    this.compute_best_patch();
  }
  compute_best_patch() {
    let max;
    this.result1 = (this.patch1.buttons * this.patch1.billings) - this.patch1.price + (this.patch1.size * 2) - this.patch1.time;
    this.result2 = (this.patch2.buttons * this.patch2.billings) - this.patch2.price + (this.patch2.size * 2) - this.patch2.time;
    this.result3 = (this.patch3.buttons * this.patch3.billings) - this.patch3.price + (this.patch3.size * 2) - this.patch3.time;

    if (this.patch1.bonus) {
      this.result1++;
    }
    if (this.patch2.bonus) {
      this.result2++;
    }
    if (this.patch3.bonus) {
      this.result3++;
    }

    this.results.push(this.result1, this.result2, this.result3);

    max = this.results.reduce((a, b) => Math.max(a, b));

    if (max == this.result1) {
      this.color_style = 'first';
      if (this.result1 + this.patch1.time < this.result2 + this.patch2.time ||
        this.result1 + this.patch1.time < this.result3 + this.patch3.time) {
        this.time_usage = "first";
      }
    } else if (max == this.result2) {
      this.color_style = 'second';
      if (this.result2 + this.patch2.time < this.result1 + this.patch1.time ||
        this.result2 + this.patch2.time < this.result3 + this.patch3.time) {
        this.time_usage = "second";
      }
    } else if (max == this.result3) {
      this.color_style = 'third';
      if (this.result3 + this.patch3.time < this.result2 + this.patch2.time ||
        this.result3 + this.patch3.time < this.result1 + this.patch1.time) {
        this.time_usage = "third";
      }
    }
    this.results = [];
  }

}


