import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="checkout-container">
      <h1>Checkout</h1>
      
      <div class="checkout-layout">
        <div class="shipping-info glass">
          <h3>Delivery Details</h3>
          <form (ngSubmit)="placeOrder()" #checkoutForm="ngForm">
            <div class="form-group">
              <label>Delivery Address</label>
              <textarea name="address" [(ngModel)]="shipping.address" required placeholder="Full street address, city, pincode"></textarea>
            </div>
            
            <div class="form-group">
              <label>Payment Method</label>
              <select name="payment" [(ngModel)]="shipping.paymentMethod">
                <option value="COD">Cash on Delivery</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
              </select>
            </div>

            <button type="submit" class="btn-premium w-100" [disabled]="!checkoutForm.valid">
              Confirm Order
            </button>
          </form>
        </div>

        <div class="order-preview glass" *ngIf="(cartService.cartItems$ | async) as items">
          <h3>Your Order</h3>
          <div *ngFor="let item of items" class="preview-item">
            <span>{{ item.productName }} (x{{ item.quantity }})</span>
            <span>{{ item.price * item.quantity | currency:'INR' }}</span>
          </div>
          <div class="final-total">
            Total: {{ cartService.getTotal() | currency:'INR' }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-container { padding: 60px 0; }
    .checkout-layout { display: grid; grid-template-columns: 1fr 400px; gap: 40px; }
    .shipping-info { padding: 40px; border-radius: 24px; }
    .form-group { margin-bottom: 25px; }
    textarea { width: 100%; height: 100px; padding: 15px; border-radius: 12px; border: 1px solid #ddd; }
    select { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #ddd; }
    .order-preview { padding: 30px; border-radius: 24px; height: fit-content; }
    .preview-item { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; }
    .final-total { margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-weight: 700; font-size: 1.3rem; text-align: right; }
    .w-100 { width: 100%; padding: 15px; font-size: 1.1rem; }
  `]
})
export class CheckoutComponent {
  shipping = { address: '', paymentMethod: 'COD' };

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  placeOrder() {
    let items: any[] = [];
    this.cartService.cartItems$.subscribe(i => items = i).unsubscribe();

    const orderPayload = {
      email: this.authService.getEmail(),
      deliveryAddress: this.shipping.address,
      paymentMethod: this.shipping.paymentMethod,
      items: items.map(item => ({
        productSizeId: item.productSizeId,
        quantity: item.quantity
      }))
    };

    this.http.post('http://localhost:8083/api/orders', orderPayload).subscribe({
      next: (res: any) => {
        alert('Order placed successfully! Order ID: ' + res.id);
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Order failed. Please try again.');
      }
    });
  }
}
