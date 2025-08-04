import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor() {
    this.initScrollEffect();
    this.initMagneticEffect();
  }

  private initScrollEffect(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        const navbar = document.getElementById('mainNavbar');
        const progressBar = document.querySelector('.nav-progress-bar') as HTMLElement;
        
        if (navbar) {
          if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }

        // Update progress bar
        if (progressBar) {
          const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
        }
      });
    }
  }

  private initMagneticEffect(): void {
    if (typeof window !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        const magneticElements = document.querySelectorAll('.magnetic-btn');
        
        magneticElements.forEach(element => {
          element.addEventListener('mousemove', (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const rect = (element as HTMLElement).getBoundingClientRect();
            const x = mouseEvent.clientX - rect.left - rect.width / 2;
            const y = mouseEvent.clientY - rect.top - rect.height / 2;
            
            (element as HTMLElement).style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
          });
          
          element.addEventListener('mouseleave', () => {
            (element as HTMLElement).style.transform = 'translate(0px, 0px)';
          });
        });
      });
    }
  }

}