import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListService } from './document-list.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [CommonModule],
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  selectedDocument: any | null = null;
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private documentListService: DocumentListService) {}

  ngOnInit(): void {
    this.fetchDocuments();
  }

  fetchDocuments(): void {
    this.documentListService.getCompanyDocuments().subscribe({
      next: (data) => {
        console.log('Fetched documents:', data);
        this.documents = data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
        this.errorMessage = 'Failed to load documents. Please try again later.';
        this.loading = false;
      },
    });
  }

  viewDetails(documentId: number): void {
    this.selectedDocument = null;
    this.documentListService.getDocumentDetails(documentId).subscribe({
      next: (data) => {
        console.log('Document details:', data);
        this.selectedDocument = data;

        const modalElement = document.getElementById('documentDetailModal');
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      },
      error: (error) => {
        console.error('Error fetching document details:', error);
        alert('Failed to fetch document details. Please try again later.');
      },
    });
  }

  deleteDocument(document: any): void {
    if (
      confirm(
        `Are you sure you want to delete the document "${document.name}"?`
      )
    ) {
      this.documentListService.deleteDocument(document.id).subscribe({
        next: () => {
          this.documents = this.documents.filter(
            (doc) => doc.id !== document.id
          );
          console.log('Document deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting document:', error);
          alert('Failed to delete document. Please try again later.');
        },
      });
    }
  }
}
