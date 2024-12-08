import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterService } from './register.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  fieldErrors: { [key: string]: string } = {};
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      apiToken: [
        '',
        [Validators.required, Validators.pattern(/^[a-f0-9\-]{36}$/)],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.registerForm.value);

    this.errorMessage = null;
    this.fieldErrors = {};

    if (this.registerForm.valid) {
      const { name, email, apiToken, password, confirmPassword } =
        this.registerForm.value;

      if (password !== confirmPassword) {
        this.fieldErrors = { confirmPassword: "Passwords don't match!" };
        return;
      }

      this.registerService
        .register({
          name,
          email,
          api_token: apiToken,
          password,
          confirm_password: confirmPassword,
        })
        .subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.successMessage = 'Registration successful!';
            this.registerForm.reset();
            this.router.navigate(['/login'], {
              queryParams: { successMessage: 'Registered successfully!' },
            });
          },
          error: (err) => {
            console.error('Registration failed:', err);

            if (err.error?.error?.message) {
              this.errorMessage = err.error.error.message;
            } else if (err.status === 500) {
              this.errorMessage =
                'Internal Server Error. Please try again later.';
            } else {
              this.errorMessage =
                err.error?.error?.title ||
                'An unexpected error occurred. Please try again.';
            }
          },
        });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      this.successMessage = null;
    }
  }
}
