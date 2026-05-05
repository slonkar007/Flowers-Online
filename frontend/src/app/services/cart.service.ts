import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>(this.loadCart());
  cartItems$ = this.cartItems.asObservable();
  count$ = this.cartItems$.pipe(map(items => items.length));

  constructor() {}

  private loadCart(): any[] {
    const cart = localStorage.getItem('cart');
    try {
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      return [];
    }
  }

  addToCart(product: any, size: any) {
    const currentItems = [...this.cartItems.value];
    const existingIndex = currentItems.findIndex(item => item.productSizeId === size.id);

    if (existingIndex > -1) {
      currentItems[existingIndex] = {
        ...currentItems[existingIndex],
        quantity: currentItems[existingIndex].quantity + 1
      };
    } else {
      currentItems.push({
        productSizeId: size.id,
        productName: product.name,
        size: size.size,
        price: size.price,
        imageUrl: product.imageUrl,
        quantity: 1
      });
    }

    this.saveCart(currentItems);
  }

  removeFromCart(index: number) {
    const currentItems = [...this.cartItems.value];
    currentItems.splice(index, 1);
    this.saveCart(currentItems);
  }

  clearCart() {
    this.saveCart([]);
  }

  private saveCart(items: any[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items);
  }

  getTotal(): number {
    return this.cartItems.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
