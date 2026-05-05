import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="detail-container" *ngIf="product">
      <div class="image-gallery">
        <img [src]="product.imageUrl" class="main-img glass" [alt]="product.name">
      </div>

      <div class="product-specs">
        <nav class="breadcrumb">
          <a routerLink="/products">Flowers</a> / <span>{{ product.name }}</span>
        </nav>

        <h1>{{ product.name }}</h1>
        <p class="description">{{ product.description }}</p>

        <div class="price-tag">
          {{ selectedSize?.price | currency:'INR':'symbol':'1.2-2' }}
        </div>

        <div class="size-selector">
          <h3>Select Size</h3>
          <div class="size-options">
            <button *ngFor="let s of product.sizes" 
                    [class.active]="selectedSize?.id === s.id"
                    (click)="selectedSize = s">
              {{ s.size }}
            </button>
          </div>
        </div>

        <div class="stock-info" [class.low]="selectedSize?.stockQty < 10">
          Stock Available: {{ selectedSize?.stockQty }} units
        </div>

        <div class="actions">
          <button (click)="addToCart()" class="btn-premium add-btn">
            Add to Shopping Cart
          </button>
        </div>
        
        <div class="features">
          <div class="feature">🚚 Free Delivery</div>
          <div class="feature">🛡️ Freshness Guaranteed</div>
          <div class="feature">🎁 Gift Wrapping Available</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      padding: 60px 0;
    }
    .main-img {
      width: 100%;
      border-radius: 30px;
      object-fit: cover;
      max-height: 600px;
    }
    .breadcrumb { margin-bottom: 20px; font-size: 0.9rem; color: #888; }
    h1 { font-size: 3rem; margin-bottom: 20px; color: var(--text-color); }
    .description { font-size: 1.1rem; color: #666; margin-bottom: 30px; }
    .price-tag {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: 40px;
    }
    .size-selector h3 { margin-bottom: 15px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px; }
    .size-options { display: flex; gap: 15px; margin-bottom: 30px; }
    .size-options button {
      padding: 10px 25px;
      border: 2px solid #ddd;
      background: white;
      border-radius: 12px;
      font-weight: 600;
    }
    .size-options button.active {
      border-color: var(--primary-color);
      color: var(--primary-color);
      background: var(--secondary-color);
    }
    .stock-info { margin-bottom: 25px; font-weight: 500; color: #2e7d32; }
    .stock-info.low { color: #d32f2f; }
    .add-btn { width: 100%; padding: 18px; font-size: 1.1rem; margin-bottom: 40px; }
    .features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .feature { font-size: 0.85rem; font-weight: 500; color: #888; text-align: center; }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: any;
  selectedSize: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
      if (this.product.sizes && this.product.sizes.length > 0) {
        this.selectedSize = this.product.sizes[0];
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product, this.selectedSize);
    alert('Added to cart!');
  }
}
