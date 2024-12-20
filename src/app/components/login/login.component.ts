import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from './login.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (isLoggedIn) {
      this.router.navigate(['/home']);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      if (params['successMessage']) {
        this.successMessage = params['successMessage'];
        setTimeout(() => (this.successMessage = null), 5000);
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.errorMessage = null;

      this.loginService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);

          localStorage.setItem('accessToken', response.access);
          localStorage.setItem('refreshToken', response.refresh);

          const decodedToken: any = jwtDecode(response.access);
          const companyId = decodedToken.company_id;

          if (companyId) {
            localStorage.setItem('companyId', companyId);
          } else {
            console.warn('Company ID not found in token');
          }

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage =
            err.error?.error?.message || 'An unexpected error occurred.';
          this.loginForm.reset();
        },
      });
    }
  }
}
