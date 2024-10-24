import { Component, AfterViewChecked, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked {
  showPopup2 = false;

  constructor(private renderer: Renderer2) {}

  togglePopup(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const popup = target.closest('.popup');

    if (popup) {
      this.renderer.addClass(popup,'fade-out');
      setTimeout(() => {
        this.showPopup2 = true;
      }, 500); 
    } else {
      console.log('Popup not found');
    }
  }

  closePopup2() {
    const popup2 = document.querySelector('.popup2');
    if (popup2) {
      this.renderer.removeClass(popup2,'fade-in');
      this.renderer.addClass(popup2,'fade-out');
      setTimeout(() => {
        this.showPopup2 = false;
        this.resetPopups();
      }, 500); 
    }
  }

  resetPopups() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      this.renderer.removeClass(popup,'fade-out');
    });
  }


  ngAfterViewChecked() {
    if (this.showPopup2) {
      const popup2 = document.querySelector('.popup2');
      if (popup2) {
        this.renderer.addClass(popup2,'show');
        this.renderer.addClass(popup2,'fade-in');
      }
    }
  }
}