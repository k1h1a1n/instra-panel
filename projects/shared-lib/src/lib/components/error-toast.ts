import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-error-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-toast" *ngIf="message" [@slideIn]>
      <div class="error-icon">⚠️</div>
      <div class="error-content">
        <p class="error-title">Error</p>
        <p class="error-message">{{ message }}</p>
      </div>
    </div>
  `,
  styles: [`
    .error-toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #fee2e2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      gap: 12px;
      align-items: flex-start;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9998;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .error-icon {
      font-size: 20px;
      flex-shrink: 0;
    }

    .error-content {
      flex: 1;
    }

    .error-title {
      margin: 0 0 4px 0;
      font-weight: 600;
      color: #991b1b;
      font-size: 14px;
    }

    .error-message {
      margin: 0;
      color: #7f1d1d;
      font-size: 13px;
    }
  `]
})
export class ErrorToastComponent {
  @Input() message: string | null = null;
}
