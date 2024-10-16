import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  zoomState = 'normal';

  toggleZoom(event: MouseEvent) {
    const leaf = (event.currentTarget as HTMLElement);
    const popup = leaf.querySelector('.popup') as HTMLElement;

    if (popup) {
      if (this.zoomState === 'normal') {
        popup.style.display = 'none';
        this.zoomState = 'zoomed';
      } else {
        popup.style.display = 'block';
        this.zoomState = 'normal';
      }
    }

    const centeredPopup = document.querySelector('.popup.centered') as HTMLElement;
    if (centeredPopup) {
      if (this.zoomState === 'zoomed') {
        centeredPopup.classList.add('zoomed');
      } else {
        centeredPopup.classList.remove('zoomed');
      }
    }
  }
}