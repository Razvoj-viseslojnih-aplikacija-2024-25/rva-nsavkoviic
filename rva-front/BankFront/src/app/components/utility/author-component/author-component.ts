import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
  MatCardHeader,
  MatCardSubtitle,
} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-author-component',
  templateUrl: './author-component.html',
  styleUrls: ['./author-component.css'],
  imports: [
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatIconModule,
    MatButtonModule,
  ],
  standalone: true,
})
export class AuthorComponent {}
