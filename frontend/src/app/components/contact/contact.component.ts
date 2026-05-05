import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="contact-container">
      <div class="contact-grid">
        <div class="contact-info">
          <h1>Get in Touch</h1>
          <p>Have questions about our flowers or services? We'd love to hear from you.</p>
          
          <div class="info-item">
            <span>📍</span>
            <div>
              <h4>Our Head Office</h4>
              <p>123 Floral Avenue, Blossom City</p>
            </div>
          </div>
          
          <div class="info-item">
            <span>📞</span>
            <div>
              <h4>Phone</h4>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>

        <div class="contact-form glass">
          <form (ngSubmit)="submitMessage()" #cForm="ngForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" [(ngModel)]="msg.name" required placeholder="Your Name">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" name="email" [(ngModel)]="msg.email" required placeholder="Email Address">
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea name="message" [(ngModel)]="msg.message" required placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" class="btn-premium w-100" [disabled]="!cForm.valid">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container { padding: 80px 0; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
    h1 { font-size: 3.5rem; margin-bottom: 20px; }
    .info-item { display: flex; gap: 20px; margin-top: 40px; }
    .info-item h4 { margin-bottom: 5px; }
    .contact-form { padding: 40px; border-radius: 30px; }
    .form-group { margin-bottom: 20px; }
    input, textarea { width: 100%; padding: 12px; border-radius: 12px; border: 1px solid #ddd; }
    textarea { height: 150px; }
    .w-100 { width: 100%; margin-top: 10px; }
  `]
})
export class ContactComponent {
  msg = { name: '', email: '', message: '' };
  constructor(private http: HttpClient) {}

  submitMessage() {
    this.http.post('http://localhost:8084/api/contact', this.msg, { responseType: 'text' }).subscribe(() => {
      alert('Message sent! We will contact you soon.');
      this.msg = { name: '', email: '', message: '' };
    });
  }
}
