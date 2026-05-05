import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div *ngIf="(cartService.cartItems$ | async) as items; else empty" class="cart-layout">
        <div *ngIf="items.length > 0; else empty" class="items-list">
          <div *ngFor="let item of items; let i = index" class="cart-item glass">
            <img [src]="item.imageUrl" alt="Product">
            <div class="item-details">
              <h3>{{ item.productName }}</h3>
              <p>Size: {{ item.size }}</p>
              <div class="item-price">{{ item.price | currency:'INR' }}</div>
            </div>
            <div class="item-quantity">
              Qty: {{ item.quantity }}
            </div>
            <button (click)="cartService.removeFromCart(i)" class="remove-btn">Remove</button>
          </div>
        </div>

        <div *ngIf="items.length > 0" class="cart-summary glass">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>{{ cartService.getTotal() | currency:'INR' }}</span>
          </div>
          <div class="summary-row">
            <span>Delivery</span>
            <span class="free">FREE</span>
          </div>
          <div class="total-row">
            <span>Total</span>
            <span>{{ cartService.getTotal() | currency:'INR' }}</span>
          </div>
          
          <button (click)="checkout()" class="btn-premium w-100">Proceed to Checkout</button>
          <a routerLink="/products" class="continue-link">Continue Shopping</a>
        </div>
      </div>

      <ng-template #empty>
        <div class="empty-cart glass">
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a routerLink="/products" class="btn-premium">Shop for Flowers</a>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container { padding: 60px 0; }
    h1 { margin-bottom: 40px; font-size: 2.5rem; }
    .cart-layout { display: grid; grid-template-columns: 1fr 350px; gap: 40px; }
    .cart-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px;
      border-radius: 20px;
      margin-bottom: 20px;
    }
    .cart-item img { width: 100px; height: 100px; border-radius: 12px; object-fit: cover; }
    .item-details { flex: 1; }
    .item-price { font-weight: 700; color: var(--primary-color); margin-top: 5px; }
    .remove-btn { color: #d32f2f; font-weight: 500; background: none; }
    .cart-summary { padding: 30px; border-radius: 24px; height: fit-content; position: sticky; top: 100px; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 15px; color: #666; }
    .total-row { display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-weight: 700; font-size: 1.2rem; }
    .free { color: #2e7d32; font-weight: 600; }
    .w-100 { width: 100%; margin-top: 25px; padding: 15px; }
    .continue-link { display: block; text-align: center; margin-top: 15px; color: #888; font-size: 0.9rem; }
    .empty-cart { text-align: center; padding: 80px; border-radius: 30px; }
  `]
})
export class CartComponent {
  constructor(public cartService: CartService, private authService: AuthService, private router: Router) {}

  checkout() {
    if (!this.authService.isLoggedIn()) {
      alert('Please login to proceed with checkout.');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/checkout']);
  }
}
