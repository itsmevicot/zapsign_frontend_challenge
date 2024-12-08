import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  documents = [
    { name: 'Document 1', link: 'https://example.com/doc1' },
    { name: 'Document 2', link: 'https://example.com/doc2' },
  ];
}
