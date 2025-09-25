import { Component } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about-component',
  templateUrl: './about-component.html',
  styleUrls: ['./about-component.css'],
  imports: [MatCardContent, MatCard, MatIconModule],
  standalone: true,
})
export class AboutComponent {}
