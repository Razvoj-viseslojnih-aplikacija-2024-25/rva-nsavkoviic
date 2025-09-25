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
import { BankaService } from '../../../services/banka.service';
import { Banka } from '../../../models/banka';

@Component({
  selector: 'app-banka-detail-modal',
  templateUrl: './banka-detail-modal.html',
  styleUrls: ['./banka-detail-modal.scss'],
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
export class BankaDetailModalComponent implements OnInit {
  banks: Banka[] = [];
  filteredBanks: Banka[] = [];
  selectedBank: Banka | null = null;
  searchTerm = '';
  preselectedId?: number;

  constructor(
    private readonly service: BankaService,
    private readonly dialogRef: MatDialogRef<BankaDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { preselectedId?: number }
  ) {
    this.preselectedId = data?.preselectedId;
  }

  ngOnInit(): void {
    this.loadBanks();
  }

  loadBanks(): void {
    this.service.getAll().subscribe({
      next: (banks) => {
        this.banks = banks;
        this.filteredBanks = banks;

        // If preselected, show details immediately
        if (this.preselectedId) {
          const preselected = banks.find((b) => b.id === this.preselectedId);
          if (preselected) {
            this.selectedBank = preselected;
          }
        }
      },
      error: (error) => {},
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredBanks = this.banks;
      return;
    }

    this.filteredBanks = this.banks.filter(
      (bank) => bank.naziv.toLowerCase().includes(term) || bank.pib.toString().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  selectBank(bank: Banka): void {
    this.selectedBank = bank;
  }

  backToList(): void {
    this.selectedBank = null;
  }

  confirm(): void {
    if (this.selectedBank) {
      this.dialogRef.close(this.selectedBank);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
