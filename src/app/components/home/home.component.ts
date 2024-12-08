import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormComponent } from '../document-form/document-form.component';
import { DocumentListComponent } from '../document-list/document-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DocumentFormComponent, DocumentListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  activeTab: string = 'list';

  constructor(private router: Router) {}

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
