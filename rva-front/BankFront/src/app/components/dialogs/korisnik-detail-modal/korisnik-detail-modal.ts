import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KorisnikService } from '../../../services/korisnik.service';
import { KorisnikUsluge } from '../../../models/korisnik';

@Component({
  selector: 'app-korisnik-detail-modal',
  templateUrl: './korisnik-detail-modal.html',
  styleUrls: ['./korisnik-detail-modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
})
export class KorisnikDetailModalComponent implements OnInit {
  users: KorisnikUsluge[] = [];
  filteredUsers: KorisnikUsluge[] = [];
  selectedKorisnik: KorisnikUsluge | null = null;
  searchTerm = '';
  preselectedId?: number;

  constructor(
    private readonly service: KorisnikService,
    private readonly dialogRef: MatDialogRef<KorisnikDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { preselectedId?: number }
  ) {
    this.preselectedId = data?.preselectedId;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.service.getAll().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;

        // If preselected, show details immediately
        if (this.preselectedId) {
          const preselected = users.find((u) => u.id === this.preselectedId);
          if (preselected) {
            this.selectedKorisnik = preselected;
          }
        }
      },
      error: (error) => {},
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredUsers = this.users;
      return;
    }

    this.filteredUsers = this.users.filter(
      (user) =>
        user.ime.toLowerCase().includes(term) ||
        user.prezime.toLowerCase().includes(term) ||
        user.maticniBroj.toString().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  selectUser(user: KorisnikUsluge): void {
    this.selectedKorisnik = user;
  }

  backToList(): void {
    this.selectedKorisnik = null;
  }

  confirm(): void {
    if (this.selectedKorisnik) {
      this.dialogRef.close(this.selectedKorisnik);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
