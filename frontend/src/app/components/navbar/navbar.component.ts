import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar glass">
      <div class="container nav-content">
        <a routerLink="/" class="logo">
          <span class="logo-icon">🌸</span>
          <span class="logo-text">Flowers Online</span>
        </a>
        
        <ul class="nav-links">
          <li><a routerLink="/" class="nav-link">Home</a></li>
          <li><a routerLink="/products" class="nav-link">Flowers</a></li>
          <li><a routerLink="/locations" class="nav-link">Locations</a></li>
          <li><a routerLink="/contact" class="nav-link">Contact</a></li>
        </ul>

        <div class="nav-actions">
          <a routerLink="/cart" class="nav-link cart-link">
            <span class="cart-icon">🛒</span>
            <span class="cart-count" *ngIf="(cartService.count$ | async) as count">{{ count }}</span>
          </a>

          <ng-container *ngIf="!authService.isLoggedIn()">
            <a routerLink="/login" class="nav-link">Login</a>
            <a routerLink="/register" class="btn-premium">Join Now</a>
          </ng-container>
          
          <ng-container *ngIf="authService.isLoggedIn()">
            <span class="user-email">{{ authService.getEmail() }}</span>
            <button (click)="logout()" class="nav-link">Logout</button>
            <a *ngIf="authService.getRole() === 'ROLE_ADMIN'" routerLink="/admin" class="btn-premium">Dashboard</a>
          </ng-container>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      padding: 15px 0;
      margin-bottom: 20px;
    }
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    .nav-links {
      display: flex;
      gap: 30px;
    }
    .nav-link {
      font-weight: 500;
      color: #555;
      transition: 0.3s;
    }
    .nav-link:hover {
      color: var(--primary-color);
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    .cart-link {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 1.2rem;
    }
    .cart-count {
      position: absolute;
      top: -8px;
      right: -10px;
      background: var(--primary-color);
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 50%;
      font-weight: 700;
    }
    .user-email {
      font-size: 0.9rem;
      color: #888;
    }
  `]
})
export class NavbarComponent {
  constructor(
    public authService: AuthService, 
    public cartService: CartService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
