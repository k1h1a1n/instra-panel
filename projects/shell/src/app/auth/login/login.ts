import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = '';

  constructor(

  ) { }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.auth.login(username!, password!)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
