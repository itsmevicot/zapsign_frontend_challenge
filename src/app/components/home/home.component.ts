import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormComponent } from '../document-form/document-form.component';
import { DocumentListComponent } from '../document-list/document-list.component';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DocumentFormComponent, DocumentListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeTab: string = 'list';
  companyName: string = 'Loading...';

  constructor(private router: Router, private homeService: HomeService) {}

  ngOnInit(): void {
    const companyId = localStorage.getItem('companyId');
    if (companyId) {
      this.loadCompanyName(companyId);
    } else {
      console.error('No company ID found in localStorage');
      this.companyName = 'Unknown Company';
    }
  }

  loadCompanyName(companyId: string): void {
    this.homeService.getCompany(companyId).subscribe({
      next: (data) => {
        this.companyName = data?.name || 'Unknown Company';
      },
      error: (err) => {
        console.error('Error fetching company data:', err);
        this.companyName = 'Error Loading Company';
      },
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
