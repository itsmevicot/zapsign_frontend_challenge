import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentListService {
  private apiUrl = `${environment.apiUrl}/documents/`;

  constructor(private http: HttpClient) {}

  getCompanyDocuments(): Observable<any[]> {
    const accessToken = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
