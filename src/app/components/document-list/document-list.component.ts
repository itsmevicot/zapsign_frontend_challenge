import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentListService } from './document-list.service';

@Component({
  selector: 'app-document-list',
  standalone: true,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  imports: [CommonModule],
})
export class DocumentListComponent implements OnInit {
  documents: any[] = [];
  loading: boolean = true;
  errorMessage: string | null = null;

  constructor(private documentListService: DocumentListService) {}

  ngOnInit(): void {
    this.fetchDocuments();
  }

  fetchDocuments(): void {
    this.documentListService.getCompanyDocuments().subscribe({
      next: (data) => {
        this.documents = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
        this.errorMessage = 'Failed to load documents. Please try again later.';
        this.loading = false;
      },
    });
  }
}
