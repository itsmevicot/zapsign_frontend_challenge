import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentFormService {
  private apiUrl = `${environment.apiUrl}/documents/`;

  constructor(private http: HttpClient) {}

  createDocument(documentData: any): Observable<any> {
    return this.http.post(this.apiUrl, documentData).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
