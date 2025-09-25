import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankaService } from '../../../services/banka.service';
import { Banka } from '../../../models/banka';

@Component({
  selector: 'app-banka-dialog',
  templateUrl: './banka-dialog.html',
  styleUrls: ['./banka-dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class BankaDialogComponent {
  flag!: number;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<BankaDialogComponent>,
    private readonly bankaService: BankaService,
    @Inject(MAT_DIALOG_DATA) public data: Banka
  ) {}

  add() {
    this.bankaService.create(this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Banka "${data.naziv}" has been successfully created!`, 'Okay', {
          duration: 2500,
        });
      },
      error: (error) => {
        this.snackBar.open('Error while creating Banka', 'Okay', { duration: 2500 });
      },
    });
  }

  update() {
    this.bankaService.update(this.data.id, this.data).subscribe({
      next: (data) => {
        this.dialogRef.close(1);
        this.snackBar.open(`Banka "${data.naziv}" has been successfully updated!`, 'Okay', {
          duration: 2500,
        });
      },
      error: (error) => {
        this.snackBar.open('Error while updating Banka', 'Okay', { duration: 2500 });
      },
    });
  }

  delete() {
    this.bankaService.delete(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(1);
        this.snackBar.open(`Banka "${this.data.naziv}" has been successfully deleted!`, 'Okay', {
          duration: 2500,
        });
      },
      error: (error) => {
        this.snackBar.open('Error while deleting Banka', 'Okay', { duration: 2500 });
      },
    });
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Operation cancelled', 'Okay', { duration: 2500 });
  }
}
