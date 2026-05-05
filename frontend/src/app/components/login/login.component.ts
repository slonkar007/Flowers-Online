import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card glass">
        <h2>Welcome Back</h2>
        <p class="subtitle">Log in to your account to continue</p>
        
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" name="email" [(ngModel)]="credentials.email" required placeholder="Enter your email">
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" [(ngModel)]="credentials.password" required placeholder="Enter your password">
          </div>
          
          <button type="submit" class="btn-premium w-100" [disabled]="!loginForm.valid">Login</button>
        </form>
        
        <p class="auth-footer">
          Don't have an account? <a routerLink="/register">Register here</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 100px);
    }
    .auth-card {
      width: 100%;
      max-width: 400px;
      padding: 40px;
      border-radius: 24px;
      text-align: center;
    }
    h2 {
      margin-bottom: 10px;
      color: var(--primary-color);
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 0.9rem;
    }
    .form-group {
      text-align: left;
      margin-bottom: 20px;
    }
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: 1px solid #ddd;
      background: rgba(255, 255, 255, 0.9);
      transition: 0.3s;
    }
    input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(233, 30, 99, 0.1);
      outline: none;
    }
    .w-100 {
      width: 100%;
      margin-top: 10px;
    }
    .auth-footer {
      margin-top: 25px;
      font-size: 0.9rem;
      color: #666;
    }
    .auth-footer a {
      color: var(--primary-color);
      font-weight: 600;
    }
  `]
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Login failed: ' + (err.error?.message || 'Invalid credentials'));
      }
    });
  }
}
