import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentListService {
  private apiUrl = `${environment.apiUrl}/documents/`;

  constructor(private http: HttpClient) {}

  getCompanyDocuments(): Observable<any[]> {
    const headers = this.createAuthHeaders();
    console.log(`Making GET request to: ${this.apiUrl} with headers:`, headers);

    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error in getCompanyDocuments:', error);
        return throwError(() => error);
      })
    );
  }

  deleteDocument(documentId: number): Observable<void> {
    const headers = this.createAuthHeaders();
    console.log(
      `Making DELETE request to: ${this.apiUrl}${documentId} with headers:`,
      headers
    );

    return this.http
      .delete<void>(`${this.apiUrl}${documentId}/`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error in deleteDocument:', error);
          return throwError(() => error);
        })
      );
  }

  getDocumentDetails(documentId: number): Observable<any> {
    const headers = this.createAuthHeaders();
    console.log(
      `Making GET request to: ${this.apiUrl}${documentId} with headers:`,
      headers
    );

    return this.http.get<any>(`${this.apiUrl}${documentId}/`, { headers }).pipe(
      catchError((error) => {
        console.error('Error in getDocumentDetails:', error);
        return throwError(() => error);
      })
    );
  }

  updateDocument(document: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${document.id}/`, document, {
      headers: this.createAuthHeaders(),
    });
  }

  updateSigner(data: {
    id: number;
    name?: string;
    email?: string;
    status?: string;
  }): Observable<any> {
    const url = `${this.apiUrl.replace('documents/', '')}signers/${data.id}/`;
    return this.http.put(url, data, { headers: this.createAuthHeaders() }).pipe(
      catchError((error) => {
        console.error('Error updating signer:', error);
        return throwError(() => error);
      })
    );
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.warn('No access token found. Make sure the user is logged in.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
