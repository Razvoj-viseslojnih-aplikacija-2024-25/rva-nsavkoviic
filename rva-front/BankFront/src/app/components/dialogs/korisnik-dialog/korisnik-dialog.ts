import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KorisnikService } from '../../../services/korisnik.service';
import { KorisnikUsluge } from '../../../models/korisnik';

@Component({
  selector: 'app-korisnik-dialog',
  templateUrl: './korisnik-dialog.html',
  styleUrls: ['./korisnik-dialog.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
  ],
})
export class KorisnikDialogComponent {
  flag!: number;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<KorisnikDialogComponent>,
    private readonly korisnikService: KorisnikService,
    @Inject(MAT_DIALOG_DATA) public data: KorisnikUsluge
  ) {}

  add() {
    // Ensure the data is valid
    if (!this.data.ime || !this.data.prezime || !this.data.maticniBroj) {
      this.snackBar.open('Please fill in all required fields', 'Okay', { duration: 2500 });
      return;
    }

    // Create a new object without the id field for creation
    const korisnikData = {
      ime: this.data.ime,
      prezime: this.data.prezime,
      maticniBroj: this.data.maticniBroj,
    };

    this.korisnikService.create(korisnikData).subscribe({
      next: (d) => {
        this.dialogRef.close(1);
        this.snackBar.open('Korisnik added!', 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open(
          'Error adding Korisnik: ' + (e.error?.message || 'Unknown error'),
          'Okay',
          { duration: 3500 }
        );
      },
    });
  }
  update() {
    if (!this.data.id) {
      this.snackBar.open('Cannot update: User ID is missing', 'Okay', { duration: 2500 });
      return;
    }

    this.korisnikService.update(this.data.id, this.data).subscribe({
      next: (d) => {
        this.dialogRef.close(1);
        this.snackBar.open('Korisnik updated!', 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error updating Korisnik', 'Okay', { duration: 2500 });
      },
    });
  }
  delete() {
    if (!this.data.id) {
      this.snackBar.open('Cannot delete: User ID is missing', 'Okay', { duration: 2500 });
      return;
    }

    this.korisnikService.delete(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(1);
        this.snackBar.open('Korisnik deleted!', 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error deleting Korisnik', 'Okay', { duration: 2500 });
      },
    });
  }
  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Operation cancelled', 'Okay', { duration: 2500 });
  }
}
