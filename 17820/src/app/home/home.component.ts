import { Component, AfterViewChecked, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewChecked, OnInit {
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

  showPopup(event: MouseEvent){
    const hoverArea = event.currentTarget as HTMLElement;
    const popup = hoverArea.querySelector('.popup');  

    this.renderer.setStyle(popup, 'display', 'block');

    // Calcula la posició del popup
    const hoverAreaRect = hoverArea.getBoundingClientRect(); // Rectangle de l'àrea on es fa hover
    const popupRect = popup?.getBoundingClientRect(); // Rectangle del popup
    const viewportWidth = window.innerWidth; // Amplada de la finestra
    const viewportHeight = window.innerHeight; // Alçada de la finestra

    // Ajusta la posició del popup perquè no surti de la pantalla
    let top = hoverAreaRect.top - (popupRect?.height ?? 0) - 10;
    let left = hoverAreaRect.left + (hoverAreaRect.width / 2) - (popupRect?.width?? 0) / 2;  

    if(top < 0) {
      top = hoverAreaRect.bottom + 10; // Ajusta cap abaix si no hi ha prou espai a dalt
    }else if (top + (popupRect?.height ?? 0) > viewportHeight){
      top = viewportHeight - (popupRect?.height ?? 0) - 10; // Ajusta cap amunt si no hi ha prou espai abaix
    }

    if(left < 0){
      left = 10; // Ajusta l'esquerra 
    }else if(left + (popupRect?.width ?? 0) > viewportWidth){
      left = viewportWidth - (popupRect?.width ?? 0) - 10; // Ajusta la dreta
    }

    this.renderer.setStyle(popup, 'top', `${top}px`);
    this.renderer.setStyle(popup, 'left', `${left}px`);
  }

  hidePopup(event: MouseEvent){
    const hoverArea = event.currentTarget as HTMLElement;
    const popup = hoverArea.querySelector('.popup');
    this.renderer.setStyle(popup, 'display', 'none');
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

  ngOnInit(){
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closePopup2();
    }
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