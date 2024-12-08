import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css'],
})
export class DocumentFormComponent {
  form = {
    link: '',
    name: '',
    signators: [{ email: '', name: '' }],
  };

  addSignator(): void {
    this.form.signators.push({ email: '', name: '' });
  }

  removeSignator(index: number): void {
    this.form.signators.splice(index, 1);
  }

  onSubmit(): void {
    console.log('Form submitted:', this.form);
    alert('Form submitted successfully!');
  }
}
