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
  patch1 = new Single_patchModel(0,0,0,0, 0, false, 0, false);
  patch2 = new Single_patchModel(0,0,0,0, 0, false, 0, false);
  patch3 = new Single_patchModel(0,0,0,0, 0, false, 0, false);
  patch4 = new Single_patchModel(0,0,0,0, 0, false, 0, false);
  patch5 = new Single_patchModel(0,0,0,0, 0, false, 0, false);
  patch6 = new Single_patchModel(0,0,0,0, 0, false, 0, false);

  results:number[]=[];
  patches:Single_patchModel[]=[];
  result1 = 0;
  result2 = 0;
  result3 = 0;
  result4 = 0;
  result5 = 0;
  result6 = 0;
  max = -69;
  money = 0;
  distance = 0;
  move = false;
  onSubmit(form: NgForm, form2: NgForm) {
    this.move = false;

    this.patch1.price = form.value.price1;
    this.patch1.size = form.value.size1;
    this.patch1.buttons = form.value.buttons1;
    this.patch1.billings = form2.value.billings;
    this.patch1.time = form.value.time1;

    this.patch2.price = form.value.price2;
    this.patch2.size = form.value.size2;
    this.patch2.buttons = form.value.buttons2;
    this.patch2.billings = form2.value.billings;
    this.patch2.time = form.value.time2;

    this.patch3.price = form.value.price3;
    this.patch3.size = form.value.size3;
    this.patch3.buttons = form.value.buttons3;
    this.patch3.billings = form2.value.billings;
    this.patch3.time = form.value.time3;

    this.patch4.price = form.value.price4;
    this.patch4.size = form.value.size4;
    this.patch4.buttons = form.value.buttons4;
    this.patch4.billings = form2.value.billings;
    this.patch4.time = form.value.time4;

    this.patch5.price = form.value.price5;
    this.patch5.size = form.value.size5;
    this.patch5.buttons = form.value.buttons5;
    this.patch5.billings = form2.value.billings;
    this.patch5.time = form.value.time5;

    this.patch6.price = form.value.price6;
    this.patch6.size = form.value.size6;
    this.patch6.buttons = form.value.buttons6;
    this.patch6.billings = form2.value.billings;
    this.patch6.time = form.value.time6;

    this.money = form2.value.money;
    this.distance = form2.value.distance;

    this.compute_best_patch();
  }
  compute_best_patch() {
    this.result1 = (this.patch1.buttons * this.patch1.billings) - this.patch1.price + (this.patch1.size * 2) - this.patch1.time;
    this.result2 = (this.patch2.buttons * this.patch2.billings) - this.patch2.price + (this.patch2.size * 2) - this.patch2.time;
    this.result3 = (this.patch3.buttons * this.patch3.billings) - this.patch3.price + (this.patch3.size * 2) - this.patch3.time;
    this.result4 = (this.patch4.buttons * this.patch4.billings) - this.patch4.price + (this.patch4.size * 2) - this.patch4.time;
    this.result5 = (this.patch5.buttons * this.patch5.billings) - this.patch5.price + (this.patch5.size * 2) - this.patch5.time;
    this.result6 = (this.patch6.buttons * this.patch6.billings) - this.patch6.price + (this.patch6.size * 2) - this.patch6.time;

    if (this.patch1.bonus) this.result1 = this.result1 + 2;
    if (this.patch2.bonus) this.result2 = this.result2 + 2;
    if (this.patch3.bonus) this.result3 = this.result3 + 2;
    if (this.patch4.bonus) this.result4 = this.result4 + 2;
    if (this.patch5.bonus) this.result5 = this.result5 + 2;
    if (this.patch6.bonus) this.result6 = this.result6 + 2;

    this.patch1.inner_value = this.result1;
    this.patch2.inner_value = this.result2;
    this.patch3.inner_value = this.result3;
    this.patch4.inner_value = this.result4;
    this.patch5.inner_value = this.result5;
    this.patch6.inner_value = this.result6;

    this.results.push(this.result1, this.result2, this.result3, this.result4, this.result5, this.result6);

    this.max = this.results.reduce((a, b) => Math.max(a, b));

    this.find_best_play();

    this.results = [];
  }

  delete_patch(id: number) {
    this.patch6 = {
      price: 0,
      size: 0,
      buttons: 0,
      time: 0,
      billings: 0,
      bonus: false, // Assuming bonus is a boolean property
      inner_value : 0,
      best_patch: false
    };
  }

  find_best_play() {
    this.patches.push(this.patch1, this.patch2, this.patch3, this.patch4, this.patch5, this.patch6);
    let tmp_max = -69;

    for (let i = 0; i < 3; i++) {
      if (this.money - this.patches[i].price >= 0) {                    //money check
        if (this.distance - this.patches[i].time >= 0) {                //time check
          if (this.patches[i].inner_value > tmp_max) {
            tmp_max = this.patches[i].inner_value;
            this.unmark_best_patch();
            this.patches[i].best_patch = true;
          }

          for (let j = i + 1; j < i+4; j++) {
            if (this.money - this.patches[i].price - this.patches[j].price >= 0) {
              if (this.distance - this.patches[i].time - this.patches[j].time >= 0) {
                if (this.patches[i].inner_value + this.patches[j].inner_value > tmp_max) {
                  tmp_max = this.patches[i].inner_value + this.patches[j].inner_value;
                  this.unmark_best_patch();
                  this.patches[i].best_patch = true;
                  this.patches[j].best_patch = true;
                }

                for (let k = j + 1; k < j+4; k++) {
                  if (this.money - this.patches[i].price - this.patches[j].price - this.patches[k].price) {
                    if (this.patches[i].inner_value + this.patches[j].inner_value + this.patches[k].inner_value > tmp_max) {
                      tmp_max = this.patches[i].inner_value + this.patches[j].inner_value + this.patches[k].inner_value;
                      this.unmark_best_patch();
                      this.patches[i].best_patch = true;
                      this.patches[j].best_patch = true;
                      this.patches[k].best_patch = true;
                    }
                  }
                }
              } else {
                if (this.patches[i].inner_value + this.patches[j].inner_value > tmp_max) {
                  tmp_max = this.patches[i].inner_value + this.patches[j].inner_value;
                  this.unmark_best_patch();
                  this.patches[i].best_patch = true;
                  this.patches[j].best_patch = true;
                }
              }
            }
          }

        } else {
          if (this.patches[i].inner_value > tmp_max) {
            tmp_max = this.patches[i].inner_value;
            this.unmark_best_patch();
            this.patches[i].best_patch = true;
          }
        }
      }
    }

    if (this.distance + 1 > tmp_max) {
      this.unmark_best_patch();
      this.move = true;
    }

    this.patches = [];
  }

  unmark_best_patch() {
    this.patches.forEach( (element) => {
      element.best_patch = false;
    });
  }


}


