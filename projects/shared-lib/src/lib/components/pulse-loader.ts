import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-pulse-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pulse-loader-overlay" *ngIf="isLoading">
      <div class="pulse-loader">
        <div class="pulse-ring"></div>
        <div class="pulse-ring"></div>
        <div class="pulse-ring"></div>
      </div>
      <p class="pulse-text" *ngIf="message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .pulse-loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(2px);
    }

    .pulse-loader {
      position: relative;
      width: 80px;
      height: 80px;
    }

    .pulse-ring {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px solid #2b6cb0;
      border-radius: 50%;
      animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .pulse-ring:nth-child(1) {
      animation-delay: 0s;
    }

    .pulse-ring:nth-child(2) {
      animation-delay: 0.5s;
    }

    .pulse-ring:nth-child(3) {
      animation-delay: 1s;
    }

    @keyframes pulse {
      0% {
        transform: scale(0.8);
        opacity: 1;
      }
      50% {
        opacity: 0.7;
      }
      100% {
        transform: scale(1.4);
        opacity: 0;
      }
    }

    .pulse-text {
      margin-top: 20px;
      color: white;
      font-size: 14px;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto;
      text-align: center;
    }
  `]
})
export class PulseLoaderComponent {
  @Input() isLoading = false;
  @Input() message = 'Loading...';
}
