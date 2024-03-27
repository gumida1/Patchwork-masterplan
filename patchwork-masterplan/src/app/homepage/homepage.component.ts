import {AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef) {}
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument
      .body.style.backgroundColor = '#FFF0CE';
  }
}


//https://colorhunt.co/palette/0c356a0174beffc436fff0ce
//https://colorhunt.co/palette/ff9843ffdd9586a7fc3468c0
