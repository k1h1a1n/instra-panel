import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedApiService {

  constructor(
    private http: HttpClient,
  ) { }

  private get runtimeConfig() {
    return (window as any).__RUNTIME_CONFIG__ || { apiBaseUrl: '/api' };
  }
  getCategoryData(category?: string): Observable<any> {

    const url = `${this.runtimeConfig.apiBaseUrl}/api/${category}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(url, { headers })
  }
}
