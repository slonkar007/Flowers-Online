import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card glass">
        <h2>Create Account</h2>
        <p class="subtitle">Join our community of flower lovers</p>
        
        <form (ngSubmit)="onRegister()" #regForm="ngForm">
          <div class="row">
            <div class="form-group col">
              <label>Title</label>
              <select name="title" [(ngModel)]="user.title">
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
            <div class="form-group col-3">
              <label>First Name</label>
              <input type="text" name="firstName" [(ngModel)]="user.firstName" required placeholder="First Name">
            </div>
          </div>

          <div class="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" [(ngModel)]="user.lastName" required placeholder="Last Name">
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" [(ngModel)]="user.email" required placeholder="Email Address">
          </div>
          
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" [(ngModel)]="user.password" required placeholder="Create Password">
          </div>

          <div class="row">
            <div class="form-group col">
              <label>City</label>
              <input type="text" name="city" [(ngModel)]="user.city" placeholder="City">
            </div>
            <div class="form-group col">
              <label>Country</label>
              <input type="text" name="country" [(ngModel)]="user.country" placeholder="Country">
            </div>
          </div>
          
          <button type="submit" class="btn-premium w-100" [disabled]="!regForm.valid">Register</button>
        </form>
        
        <p class="auth-footer">
          Already have an account? <a routerLink="/login">Login here</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 0;
    }
    .auth-card {
      width: 100%;
      max-width: 500px;
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
    }
    .form-group {
      text-align: left;
      margin-bottom: 15px;
    }
    .row {
      display: flex;
      gap: 15px;
    }
    .col { flex: 1; }
    .col-3 { flex: 3; }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 0.85rem;
    }
    input, select {
      width: 100%;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid #ddd;
      background: white;
    }
    .w-100 { width: 100%; margin-top: 15px; }
    .auth-footer { margin-top: 20px; font-size: 0.9rem; }
  `]
})
export class RegisterComponent {
  user = {
    title: 'Mr.',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    city: '',
    country: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.register(this.user).subscribe({
      next: (res) => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Registration failed: ' + (err.error || 'Check your details'));
      }
    });
  }
}
