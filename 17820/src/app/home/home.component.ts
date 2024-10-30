import { Component, AfterViewChecked, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  showPopup2 = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // Esperem un moment per assegurar-nos que el DOM està carregat
    setTimeout(() => {
      this.generateFallingLeaves();
    }, 100);
  }

  ngAfterViewChecked(): void {
    if (this.showPopup2) {
      const popup2 = document.querySelector('.popup2');
      if (popup2) {
        this.renderer.addClass(popup2, 'show');
        this.renderer.addClass(popup2, 'fade-in');
      }
    }
  }

  togglePopup(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const popup = target.closest('.popup');

    if (popup) {
      this.renderer.addClass(popup, 'fade-out');
      setTimeout(() => {
        this.showPopup2 = true;
      }, 500);
    } else {
      console.log('Popup not found');
    }
  }

  closePopup2(): void {
    const popup2 = document.querySelector('.popup2');
    if (popup2) {
      this.renderer.removeClass(popup2, 'fade-in');
      this.renderer.addClass(popup2, 'fade-out');
      setTimeout(() => {
        this.showPopup2 = false;
        this.resetPopups();
      }, 500);
    }
  }

  resetPopups(): void {
    const popups = document.querySelectorAll('.popup');
    popups.forEach((popup) => {
      this.renderer.removeClass(popup, 'fade-out');
    });
  }

  generateFallingLeaves(): void {
    const container = document.querySelector('.leaves-container');
    
    if (!container) {
      console.error('No s\'ha trobat el contenidor de fulles!');
      return;
    }

    const numLeaves = 20; // Nombre de fulles

    for (let i = 0; i < numLeaves; i++) {
      // Crear fulla utilitzant el renderer
      const leaf = this.renderer.createElement('div');
      this.renderer.addClass(leaf, 'falling-leaf');

      // Genera una mida aleatòria per a la fulla
      const size = Math.random() * 30 + 30; // Mida entre 30px i 60px
      leaf.style.width = `${size}px`;
      leaf.style.height = `${size}px`;
      
      // Posició horitzontal aleatòria només en les bandes de la pantalla
      const posX = Math.random() * 50; // Genera un valor entre 0 i 50
      const adjustedPosX = posX < 25 ? posX : posX + 50; // Ajusta el valor per estar en les bandes
      this.renderer.setStyle(leaf, 'left', `${adjustedPosX}vw`);
      
      // Durada aleatòria de l'animació (entre 10 i 20 segons)
      const duration = 10 + Math.random() * 10;
      this.renderer.setStyle(leaf, 'animationDuration', `${duration}s`);
      
      // Retard aleatori per a cada fulla (entre 0 i 5 segons)
      const delay = Math.random() * 5;
      this.renderer.setStyle(leaf, 'animationDelay', `-${delay}s`);

      // Afegir la fulla al contenidor
      this.renderer.appendChild(container, leaf);
    }
  }
}