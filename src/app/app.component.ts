import { Component, HostListener  } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showButtonsAtTop = true;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    // Adjust the threshold as needed
    this.showButtonsAtTop = scrollY < 100;
  }
  title = 'registration';
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }
}
