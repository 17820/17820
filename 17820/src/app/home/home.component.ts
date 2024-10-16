import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Inicializar Zoomooz en los elementos con la clase zoomTarget
    ($('.zoomTarget') as any).zoomTarget();
  }

  togglePopup(event: MouseEvent) {
    const leaf = event.currentTarget as HTMLElement;
    const popup = leaf.querySelector('.popup') as HTMLElement;

    if (popup.classList.contains('visible')) {
      popup.classList.remove('visible');
      ($(popup) as any).zoomTo({ targetsize: 1.0, duration: 600 });
      popup.classList.remove('zoomed');
      popup.classList.remove('fixed');
    } else {
      popup.classList.add('visible');
      ($(popup) as any).zoomTo({ targetsize: 1.5, duration: 600, callback: () => {
        popup.classList.add('zoomed');
        popup.classList.add('fixed');
      }});
    }

    // Añadir eventos mouseenter y mouseleave
    popup.addEventListener('mouseenter', () => {
      popup.classList.add('hovered');
    });

    popup.addEventListener('mouseleave', () => {
      if (popup.classList.contains('zoomed')) {
        popup.classList.remove('hovered');
      } else {
        popup.classList.remove('hovered');
        popup.classList.remove('visible');
        ($(popup) as any).zoomTo({ targetsize: 1.0, duration: 600 });
        popup.classList.remove('zoomed');
        popup.classList.remove('fixed');
      }
    });
  }
}