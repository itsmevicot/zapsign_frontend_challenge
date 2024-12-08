import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = `${environment.apiUrl}/auth/register/`;

  constructor(private http: HttpClient) {}

  register(userData: {
    name: string;
    email: string;
    api_token: string;
    password: string;
    confirm_password: string;
  }): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
