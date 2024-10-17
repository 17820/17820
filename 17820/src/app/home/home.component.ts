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
    // Seleccionar los elementos con la clase zoomTarget
    const zoomTargets = $('.zoomTarget');
    let clickedInside = false;

    // Manejar el evento de clic dentro del popup
    zoomTargets.on('click', function() {
      clickedInside = true;
    });

    // Manejar el evento de mouseleave
    zoomTargets.on('mouseleave', function() {
      if (clickedInside) {
        const duration = $(this).data('duration') || 600;
        $(this).css({
          transform: 'scale(1)',
          transition: `transform ${duration}ms`
        });

        // Simular clic si data-closeclick es true
        if ($(this).data('closeclick')) {
          $(this).click();
        }

        // Resetear la bandera
        clickedInside = false;
      }
    });
  }
}