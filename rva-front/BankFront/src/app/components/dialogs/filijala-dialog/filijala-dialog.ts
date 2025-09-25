import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FilijalaService } from '../../../services/filijala.service';
import { BankaService } from '../../../services/banka.service';
import { Filijala } from '../../../models/filijala';
import { Banka } from '../../../models/banka';
import { BankaDetailModalComponent } from '../banka-detail-modal/banka-detail-modal';
// (Removed custom dropdown animations – using native MatSelect)

@Component({
  selector: 'app-filijala-dialog',
  templateUrl: './filijala-dialog.html',
  styleUrls: ['./filijala-dialog.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  animations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class FilijalaDialogComponent implements OnInit {
  flag!: number;
  banke: Banka[] = [];
  selectedBankaId: number | null = null;
  selectedBankaLabel = '';

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<FilijalaDialogComponent>,
    private readonly filijalaService: FilijalaService,
    private readonly bankaService: BankaService,
    private readonly dialogService: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Filijala
  ) {
    // Initialize nested objects to prevent undefined errors
    if (!this.data.banka) {
      this.data.banka = {} as any;
    }
  }

  ngOnInit() {
    this.loadBanke();
    // Set selected bank ID if editing
    if (this.data.banka?.id) {
      this.selectedBankaId = this.data.banka.id;
      this.selectedBankaLabel = this.composeBankaLabel(this.data.banka);
    }
  }

  loadBanke() {
    this.bankaService.getAll().subscribe({
      next: (banke) => {
        this.banke = banke;
      },
      error: (e) => {
        this.snackBar.open('Error loading banks', 'Okay', { duration: 2500 });
      },
    });
  }

  private composeBankaLabel(banka: Banka): string {
    if (!banka) return '';
    return `${banka.naziv} (PIB: ${banka.pib})`;
  }

  openBankaPicker(): void {
    if (this.flag === 3) return;
    const ref = this.dialogService.open(BankaDetailModalComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'fullscreen-dialog',
      data: { preselectedId: this.selectedBankaId },
    });

    ref.afterClosed().subscribe((result: Banka | undefined) => {
      if (result) {
        this.selectedBankaId = result.id;
        this.data.banka.id = result.id;
        this.selectedBankaLabel = this.composeBankaLabel(result);
      }
    });
  }

  onBankaSelectionChange() {
    if (this.selectedBankaId) {
      this.data.banka.id = this.selectedBankaId;
    }
  }

  add() {
    this.filijalaService.create(this.data).subscribe({
      next: (d) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Filijala added!`, 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error adding Filijala', 'Okay', { duration: 2500 });
      },
    });
  }
  update() {
    if (!this.data.id) {
      this.snackBar.open('Error: No ID found for update', 'Okay', { duration: 2500 });
      return;
    }
    this.filijalaService.update(this.data.id, this.data).subscribe({
      next: (d) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Filijala updated!`, 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error updating Filijala', 'Okay', { duration: 2500 });
      },
    });
  }
  delete() {
    if (!this.data.id) {
      this.snackBar.open('Error: No ID found for delete', 'Okay', { duration: 2500 });
      return;
    }
    this.filijalaService.delete(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(1);
        this.snackBar.open(`Filijala deleted!`, 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error deleting Filijala', 'Okay', { duration: 2500 });
      },
    });
  }
  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Operation cancelled', 'Okay', { duration: 2500 });
  }
}
