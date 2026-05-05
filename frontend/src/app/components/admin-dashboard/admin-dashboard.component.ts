import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="admin-container">
      <header class="admin-header">
        <h1>Admin Control Panel</h1>
        <p>Welcome back, Administrator. Here's what's happening today.</p>
      </header>

      <div class="stats-grid">
        <div class="stat-card glass">
          <div class="stat-icon">💰</div>
          <div class="stat-value">{{ totalRevenue | currency:'INR' }}</div>
          <div class="stat-label">Total Revenue</div>
        </div>
        <div class="stat-card glass">
          <div class="stat-icon">📦</div>
          <div class="stat-value">{{ orderCount }}</div>
          <div class="stat-label">Total Orders</div>
        </div>
        <div class="stat-card glass">
          <div class="stat-icon">⭐</div>
          <div class="stat-value">{{ reviewCount }}</div>
          <div class="stat-label">Customer Reviews</div>
        </div>
        <div class="stat-card glass">
          <div class="stat-icon">📍</div>
          <div class="stat-value">{{ locationCount }}</div>
          <div class="stat-label">Active Branches</div>
        </div>
      </div>

      <div class="management-sections">
        <div class="mgmt-card glass">
          <h3>Recent Orders</h3>
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of recentOrders">
                <td>#{{ order.id }}</td>
                <td>{{ order.customerEmail }}</td>
                <td>{{ order.totalAmount | currency:'INR' }}</td>
                <td><span class="status-badge">{{ order.status }}</span></td>
              </tr>
            </tbody>
          </table>
          <a routerLink="/admin/orders" class="view-all">View all orders →</a>
        </div>

        <div class="quick-links">
          <div class="link-card glass" routerLink="/admin/products">
            <h4>Manage Products</h4>
            <p>Add, edit or remove flowers and seeds.</p>
          </div>
          <div class="link-card glass" routerLink="/admin/locations">
            <h4>Store Locations</h4>
            <p>Manage physical store addresses.</p>
          </div>
          <div class="link-card glass" routerLink="/admin/reviews">
            <h4>Moderate Reviews</h4>
            <p>Read and manage customer feedback.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container { padding: 40px 0; }
    .admin-header { margin-bottom: 40px; }
    h1 { font-size: 2.5rem; margin-bottom: 10px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 25px; margin-bottom: 50px; }
    .stat-card { padding: 30px; border-radius: 24px; text-align: center; }
    .stat-icon { font-size: 2rem; margin-bottom: 10px; }
    .stat-value { font-size: 1.8rem; font-weight: 700; color: var(--primary-color); }
    .stat-label { color: #888; font-size: 0.9rem; margin-top: 5px; }
    
    .management-sections { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
    .mgmt-card { padding: 30px; border-radius: 24px; }
    .admin-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    .admin-table th { text-align: left; padding: 12px; color: #888; font-weight: 500; border-bottom: 1px solid #eee; }
    .admin-table td { padding: 15px 12px; border-bottom: 1px solid #f9f9f9; font-size: 0.95rem; }
    .status-badge { background: #e8f5e9; color: #2e7d32; padding: 4px 10px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; }
    .view-all { display: block; margin-top: 20px; color: var(--primary-color); font-weight: 600; text-align: center; }

    .quick-links { display: flex; flex-direction: column; gap: 20px; }
    .link-card { padding: 25px; border-radius: 20px; cursor: pointer; transition: 0.3s; }
    .link-card:hover { transform: scale(1.02); border-color: var(--primary-color); }
    .link-card h4 { margin-bottom: 8px; color: var(--primary-color); }
    .link-card p { font-size: 0.85rem; color: #666; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  totalRevenue = 0;
  orderCount = 0;
  reviewCount = 0;
  locationCount = 0;
  recentOrders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // Fetch orders for revenue and count
    this.http.get<any[]>('http://localhost:8083/api/orders/admin/all').subscribe(res => {
      this.recentOrders = res.slice(0, 5);
      this.orderCount = res.length;
      this.totalRevenue = res.reduce((acc, o) => acc + o.totalAmount, 0);
    });

    // Fetch reviews count
    this.http.get<any[]>('http://localhost:8084/api/reviews/admin/all').subscribe(res => {
      this.reviewCount = res.length;
    });

    // Fetch locations count
    this.http.get<any[]>('http://localhost:8084/api/locations').subscribe(res => {
      this.locationCount = res.length;
    });
  }
}
