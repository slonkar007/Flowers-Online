import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="location-container">
      <h1>Our Locations</h1>
      <p class="subtitle">Visit us at any of our branches across the country.</p>
      
      <div class="location-grid">
        <div *ngFor="let loc of locations" class="location-card glass">
          <div class="loc-icon">📍</div>
          <h3>{{ loc.shopName }}</h3>
          <p class="address">{{ loc.address }}</p>
          <p class="phone">📞 {{ loc.phoneNumber }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .location-container { padding: 60px 0; text-align: center; }
    h1 { font-size: 3rem; margin-bottom: 10px; }
    .subtitle { color: #666; margin-bottom: 50px; }
    .location-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
    .location-card { padding: 30px; border-radius: 24px; text-align: left; }
    .loc-icon { font-size: 2rem; margin-bottom: 15px; }
    h3 { margin-bottom: 15px; color: var(--primary-color); }
    .address { margin-bottom: 10px; color: #555; }
    .phone { font-weight: 600; color: #333; }
  `]
})
export class LocationComponent implements OnInit {
  locations: any[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8084/api/locations').subscribe(res => this.locations = res);
  }
}
