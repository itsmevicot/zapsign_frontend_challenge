import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DocumentFormService } from './document-form.service';

@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css'],
})
export class DocumentFormComponent implements OnInit {
  documentForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private documentFormService: DocumentFormService,
    private router: Router
  ) {
    this.documentForm = this.fb.group({
      link: [
        '',
        [Validators.required, Validators.pattern(/https?:\/\/.+\.(pdf)/i)],
      ],
      name: ['', [Validators.required]],
      signators: this.fb.array([this.createSignator()]),
    });
  }

  ngOnInit(): void {}

  get signators(): FormArray {
    return this.documentForm.get('signators') as FormArray;
  }

  private createSignator(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
    });
  }

  addSignator(): void {
    this.signators.push(this.createSignator());
  }

  removeSignator(index: number): void {
    if (this.signators.length > 1) {
      this.signators.removeAt(index);
    } else {
      this.errorMessage = 'At least one signator is required.';
      setTimeout(() => (this.errorMessage = null), 3000);
    }
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      this.documentFormService
        .uploadDocument(this.documentForm.value)
        .subscribe({
          next: (response: any) => {
            this.successMessage = 'Document uploaded successfully.';
            this.resetForm();
            setTimeout(() => (this.successMessage = null), 3000);
          },
          error: (error: any) => {
            this.errorMessage =
              error.error?.message || 'An unexpected error occurred.';
            setTimeout(() => (this.errorMessage = null), 3000);
          },
        });
    } else {
      this.errorMessage = 'Please ensure all fields are filled out correctly.';
      setTimeout(() => (this.errorMessage = null), 3000);
    }
  }

  resetForm(): void {
    this.documentForm.reset({
      link: '',
      name: '',
      signators: [this.createSignator()],
    });
    this.signators.clear();
    this.signators.push(this.createSignator());
  }
}
