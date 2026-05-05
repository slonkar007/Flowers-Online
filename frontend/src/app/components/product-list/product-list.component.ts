import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="product-page">
      <aside class="sidebar glass">
        <h3>Categories</h3>
        <ul>
          <li (click)="filterByCategory(null)" [class.active]="!selectedCategory">All Flowers</li>
          <li *ngFor="let cat of categories" 
              (click)="filterByCategory(cat.id)" 
              [class.active]="selectedCategory === cat.id">
            {{ cat.name }}
          </li>
        </ul>
      </aside>

      <div class="content">
        <header class="list-header">
          <h2>{{ headerTitle }}</h2>
          <p>{{ products.length }} items found</p>
        </header>

        <div class="product-grid">
          <div *ngFor="let product of products" class="product-card glass">
            <div class="product-img">
              <img [src]="product.imageUrl" [alt]="product.name">
              <div class="category-badge" *ngFor="let c of product.categories">{{ c.name }}</div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price-range">Starting from {{ getMinPrice(product) | currency:'INR':'symbol':'1.2-2' }}</p>
              <a [routerLink]="['/product', product.id]" class="btn-premium">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-page {
      display: flex;
      gap: 40px;
      padding: 40px 0;
    }
    .sidebar {
      width: 250px;
      height: fit-content;
      padding: 25px;
      border-radius: 20px;
      position: sticky;
      top: 100px;
    }
    .sidebar h3 { margin-bottom: 20px; color: var(--primary-color); }
    .sidebar li {
      padding: 10px 15px;
      border-radius: 10px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 5px;
    }
    .sidebar li:hover, .sidebar li.active {
      background: var(--primary-color);
      color: white;
    }
    .content { flex: 1; }
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 30px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }
    .product-card {
      border-radius: 24px;
      overflow: hidden;
      transition: 0.3s;
    }
    .product-card:hover { transform: translateY(-10px); }
    .product-img {
      position: relative;
      height: 250px;
    }
    .product-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .category-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(255, 255, 255, 0.9);
      padding: 4px 12px;
      border-radius: 50px;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-color);
    }
    .product-info { padding: 20px; text-align: center; }
    .product-info h3 { margin-bottom: 8px; font-size: 1.2rem; }
    .price-range { color: #666; margin-bottom: 15px; font-weight: 500; }
  `]
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: number | null = null;
  headerTitle = 'Our Collection';

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.productService.getCategories().subscribe(res => this.categories = res);
    
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.filterByCategory(+params['category']);
      } else {
        this.loadProducts();
      }
    });
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(res => this.products = res);
  }

  filterByCategory(id: number | null) {
    this.selectedCategory = id;
    if (id) {
      this.productService.getProductsByCategory(id).subscribe(res => {
        this.products = res;
        const cat = this.categories.find(c => c.id === id);
        this.headerTitle = cat ? `${cat.name} Flowers` : 'Filtered Collection';
      });
    } else {
      this.headerTitle = 'Our Collection';
      this.loadProducts();
    }
  }

  getMinPrice(product: any): number {
    if (!product.sizes || product.sizes.length === 0) return 0;
    return Math.min(...product.sizes.map((s: any) => s.price));
  }
}
