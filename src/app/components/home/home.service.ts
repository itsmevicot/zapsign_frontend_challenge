import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/companies`;

  constructor(private http: HttpClient) {}

  getCompany(companyId: string): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get(`${this.apiUrl}/${companyId}/`, { headers });
  }
}
