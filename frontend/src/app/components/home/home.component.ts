import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="hero">
      <div class="hero-content">
        <h1>Beautiful Blooms, <br>Delivered with <span>Love</span></h1>
        <p>Explore our curated collection of fresh flowers and premium seeds for every occasion.</p>
        <div class="hero-btns">
          <a routerLink="/products" class="btn-premium">Shop Now</a>
          <a routerLink="/contact" class="btn-outline">Contact Us</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800" alt="Flowers Hero">
      </div>
    </div>

    <section class="categories">
      <h2 class="section-title">Shop by Category</h2>
      <div class="category-grid">
        <div *ngFor="let cat of categories" class="category-card glass">
          <div class="cat-icon">{{ cat.icon }}</div>
          <h3>{{ cat.name }}</h3>
          <p>{{ cat.desc }}</p>
          <a [routerLink]="['/products']" [queryParams]="{ category: cat.id }" class="cat-link">Explore →</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      display: flex;
      align-items: center;
      gap: 50px;
      padding: 60px 0;
    }
    .hero-content {
      flex: 1;
    }
    .hero-content h1 {
      font-size: 3.5rem;
      line-height: 1.2;
      margin-bottom: 20px;
    }
    .hero-content h1 span {
      color: var(--primary-color);
    }
    .hero-content p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 35px;
      max-width: 500px;
    }
    .hero-btns {
      display: flex;
      gap: 20px;
    }
    .btn-outline {
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      padding: 10px 24px;
      border-radius: 50px;
      font-weight: 500;
    }
    .hero-image {
      flex: 1;
    }
    .hero-image img {
      width: 100%;
      border-radius: 30px;
      box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
    }
    .section-title {
      text-align: center;
      font-size: 2rem;
      margin: 60px 0 40px;
    }
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-bottom: 80px;
    }
    .category-card {
      padding: 30px;
      border-radius: 20px;
      text-align: center;
      transition: 0.3s;
    }
    .category-card:hover {
      transform: translateY(-10px);
    }
    .cat-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }
    .cat-link {
      display: inline-block;
      margin-top: 15px;
      color: var(--primary-color);
      font-weight: 600;
    }
  `]
})
export class HomeComponent {
  categories = [
    { id: 1, name: 'Birthday', icon: '🎂', desc: 'Make their day special with vibrant blooms.' },
    { id: 2, name: 'Love', icon: '💖', desc: 'Express your feelings with classic roses.' },
    { id: 3, name: 'Marriage', icon: '💍', desc: 'Elegant arrangements for a new beginning.' },
    { id: 4, name: 'Grand Opening', icon: '🏢', desc: 'Wish them success with stunning bouquets.' }
  ];
}
