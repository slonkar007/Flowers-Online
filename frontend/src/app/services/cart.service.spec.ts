import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new item to the cart', () => {
    const product = { name: 'Rose', imageUrl: 'rose.jpg' };
    const size = { id: 1, size: 'SMALL', price: 100 };

    service.addToCart(product, size);

    service.cartItems$.subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].productName).toBe('Rose');
      expect(items[0].quantity).toBe(1);
    });
  });

  it('should increase quantity if item already in cart', () => {
    const product = { name: 'Rose', imageUrl: 'rose.jpg' };
    const size = { id: 1, size: 'SMALL', price: 100 };

    service.addToCart(product, size);
    service.addToCart(product, size);

    service.cartItems$.subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should calculate the total price correctly', () => {
    const product1 = { name: 'Rose', imageUrl: 'rose.jpg' };
    const size1 = { id: 1, size: 'SMALL', price: 100 };
    
    const product2 = { name: 'Lily', imageUrl: 'lily.jpg' };
    const size2 = { id: 2, size: 'LARGE', price: 250 };

    service.addToCart(product1, size1);
    service.addToCart(product2, size2);

    expect(service.getTotal()).toBe(350);
  });

  it('should remove an item from the cart', () => {
    const product = { name: 'Rose', imageUrl: 'rose.jpg' };
    const size = { id: 1, size: 'SMALL', price: 100 };

    service.addToCart(product, size);
    service.removeFromCart(0);

    service.cartItems$.subscribe(items => {
      expect(items.length).toBe(0);
    });
  });
});
