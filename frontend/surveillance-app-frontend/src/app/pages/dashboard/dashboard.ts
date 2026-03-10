import { Component, inject, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  protected auth = inject(AuthService);
  private http = inject(HttpClient);

  apiResponse = signal<any>(null);
  apiError = signal<string>('');
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.callSpringBootApi();
  }

  callSpringBootApi(): void {
    this.http.get('http://localhost:8081/api/hello').subscribe({
      next: (data) => {
        this.apiResponse.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.apiError.set(`Erreur ${err.status} : impossible de contacter l'API`);
        this.loading.set(false);
      }
    });
  }
}