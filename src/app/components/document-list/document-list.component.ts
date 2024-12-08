import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocumentListService } from './document-list.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  selectedDocument: any | null = null;
  editForm: FormGroup;
  editingType: 'document' | 'signer' | null = null;
  editingItem: any | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private documentListService: DocumentListService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
    });
  }

  ngOnInit(): void {
    this.fetchDocuments();
  }

  fetchDocuments(): void {
    this.documentListService.getCompanyDocuments().subscribe({
      next: (data) => {
        this.documents = data || [];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load documents. Please try again later.';
        this.loading = false;
      },
    });
  }

  viewDetails(documentId: number): void {
    this.documentListService.getDocumentDetails(documentId).subscribe({
      next: (data) => {
        this.selectedDocument = data;
        const modalElement = document.getElementById('documentDetailModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: () => {
        this.errorMessage = 'Failed to fetch document details.';
      },
    });
  }

  openEditModal(type: 'document' | 'signer', item: any): void {
    this.editingType = type;
    this.editingItem = item;
    this.editForm.reset({
      name: item.name || '',
      email: type === 'signer' ? item.email || '' : '',
    });

    const modal = new bootstrap.Modal(document.getElementById('editModal')!);
    modal.show();
  }

  updateItem(): void {
    if (!this.editForm?.valid) {
      alert('Please fill out the form correctly.');
      return;
    }

    const updatedData = { ...this.editForm.value };

    if (this.editingType === 'document') {
      this.documentListService
        .updateDocument({
          id: this.selectedDocument.id,
          company_id: this.selectedDocument.company,
          ...updatedData,
        })
        .subscribe({
          next: () => {
            this.fetchDocuments();
            this.closeEditModal();
          },
          error: () => {
            this.errorMessage = 'Failed to update the document.';
          },
        });
    } else if (this.editingType === 'signer') {
      this.documentListService
        .updateSigner({
          id: this.editingItem.id,
          document: this.selectedDocument.id,
          ...updatedData,
        })
        .subscribe({
          next: () => {
            this.viewDetails(this.selectedDocument.id);
            this.closeEditModal();
          },
          error: () => {
            this.errorMessage = 'Failed to update the signer.';
          },
        });
    }
  }

  closeEditModal(): void {
    const modalElement = document.getElementById('editModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }

    this.editingType = null;
    this.editingItem = null;
    this.editForm.reset();
  }

  deleteDocument(document: any): void {
    if (confirm(`Are you sure you want to delete "${document.name}"?`)) {
      this.documentListService.deleteDocument(document.id).subscribe(() => {
        this.documents = this.documents.filter((doc) => doc.id !== document.id);
      });
    }
  }
}
