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
import { FilijalaService } from '../../../services/filijala.service';
import { Filijala } from '../../../models/filijala';

@Component({
  selector: 'app-filijala-detail-modal',
  templateUrl: './filijala-detail-modal.html',
  styleUrls: ['./filijala-detail-modal.scss'],
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
export class FilijalaDetailModalComponent implements OnInit {
  branches: Filijala[] = [];
  filteredBranches: Filijala[] = [];
  selectedFilijala: Filijala | null = null;
  searchTerm = '';
  preselectedId?: number;

  constructor(
    private readonly service: FilijalaService,
    private readonly dialogRef: MatDialogRef<FilijalaDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { preselectedId?: number }
  ) {
    this.preselectedId = data?.preselectedId;
  }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.service.getAll().subscribe({
      next: (branches) => {
        this.branches = branches;
        this.filteredBranches = branches;

        // If preselected, show details immediately
        if (this.preselectedId) {
          const preselected = branches.find((b) => b.id === this.preselectedId);
          if (preselected) {
            this.selectedFilijala = preselected;
          }
        }
      },
      error: (error) => {},
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredBranches = this.branches;
      return;
    }

    this.filteredBranches = this.branches.filter(
      (branch) =>
        branch.adresa.toLowerCase().includes(term) ||
        branch.banka?.naziv?.toLowerCase().includes(term) ||
        branch.brojPultova?.toString().includes(term)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilter();
  }

  selectBranch(branch: Filijala): void {
    this.selectedFilijala = branch;
  }

  backToList(): void {
    this.selectedFilijala = null;
  }

  confirm(): void {
    if (this.selectedFilijala) {
      this.dialogRef.close(this.selectedFilijala);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
