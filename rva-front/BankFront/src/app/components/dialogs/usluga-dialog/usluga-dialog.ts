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
import { MatSelectModule } from '@angular/material/select'; // still used elsewhere if needed
import { MatSnackBar } from '@angular/material/snack-bar';
import { UslugaService } from '../../../services/usluga.service';
import { FilijalaService } from '../../../services/filijala.service';
import { KorisnikService } from '../../../services/korisnik.service';
import { Usluga } from '../../../models/usluga';
import { Filijala } from '../../../models/filijala';
import { KorisnikUsluge } from '../../../models/korisnik';
import { FilijalaDetailModalComponent } from '../filijala-detail-modal/filijala-detail-modal';
import { KorisnikDetailModalComponent } from '../korisnik-detail-modal/korisnik-detail-modal';
// Removed custom dropdown animations

@Component({
  selector: 'app-usluga-dialog',
  templateUrl: './usluga-dialog.html',
  styleUrls: ['./usluga-dialog.scss'],
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
    // Picker dialogs are opened dynamically; no need to include as imports array entries
  ],
})
export class UslugaDialogComponent implements OnInit {
  flag!: number;
  filijale: Filijala[] = [];
  korisnici: KorisnikUsluge[] = [];
  selectedFilijalaId: number | null = null;
  selectedKorisnikId: number | null = null;
  selectedFilijalaLabel = '';
  selectedKorisnikLabel = '';
  // Removed custom dropdown state

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<UslugaDialogComponent>,
    private readonly uslugaService: UslugaService,
    private readonly filijalaService: FilijalaService,
    private readonly korisnikService: KorisnikService,
    private readonly dialogService: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Usluga
  ) {
    // Initialize nested objects to prevent undefined errors
    if (!this.data.filijala) {
      this.data.filijala = {} as any;
    }
    if (!this.data.korisnik) {
      this.data.korisnik = {} as any;
    }
  }

  ngOnInit() {
    this.loadFilijale();
    this.loadKorisnici();
    // Set selected IDs if editing
    if (this.data.filijala?.id) {
      this.selectedFilijalaId = this.data.filijala.id;
      this.selectedFilijalaLabel = this.composeFilijalaLabel(this.data.filijala);
    }
    if (this.data.korisnik?.id) {
      this.selectedKorisnikId = this.data.korisnik.id;
      this.selectedKorisnikLabel = this.composeKorisnikLabel(this.data.korisnik as any);
    }
  }

  loadFilijale() {
    this.filijalaService.getAll().subscribe({
      next: (filijale) => {
        this.filijale = filijale;
      },
      error: (e) => {
        this.snackBar.open('Error loading branches', 'Okay', { duration: 2500 });
      },
    });
  }

  loadKorisnici() {
    this.korisnikService.getAll().subscribe({
      next: (korisnici) => {
        this.korisnici = korisnici;
      },
      error: (e) => {
        this.snackBar.open('Error loading users', 'Okay', { duration: 2500 });
      },
    });
  }

  // Removed custom dropdown methods now that we rely on mat-select

  onFilijalaSelectionChange() {
    if (this.selectedFilijalaId) this.data.filijala.id = this.selectedFilijalaId;
  }
  onKorisnikSelectionChange() {
    if (this.selectedKorisnikId) this.data.korisnik.id = this.selectedKorisnikId;
  }

  private composeFilijalaLabel(f: Filijala): string {
    if (!f) return '';
    return `${f.adresa}${f.banka ? ' (' + f.banka.naziv + ')' : ''}`;
  }

  private composeKorisnikLabel(k: KorisnikUsluge): string {
    if (!k) return '';
    return `${k.ime} ${k.prezime} (${k.maticniBroj})`;
  }

  openFilijalaPicker(): void {
    if (this.flag === 3) return;
    const ref = this.dialogService.open(FilijalaDetailModalComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'fullscreen-dialog',
      data: { preselectedId: this.selectedFilijalaId },
    });
    ref.afterClosed().subscribe((res: Filijala | undefined) => {
      if (res) {
        this.selectedFilijalaId = res.id;
        this.data.filijala.id = res.id;
        this.selectedFilijalaLabel = this.composeFilijalaLabel(res);
      }
    });
  }

  openKorisnikPicker(): void {
    if (this.flag === 3) return;
    const ref = this.dialogService.open(KorisnikDetailModalComponent, {
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'fullscreen-dialog',
      data: { preselectedId: this.selectedKorisnikId },
    });
    ref.afterClosed().subscribe((res: KorisnikUsluge | undefined) => {
      if (res) {
        this.selectedKorisnikId = res.id || null;
        this.data.korisnik.id = res.id;
        this.selectedKorisnikLabel = this.composeKorisnikLabel(res);
      }
    });
  }

  add() {
    this.uslugaService.create(this.data).subscribe({
      next: (d) => {
        this.dialogRef.close(1);
        this.snackBar.open('Usluga added!', 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error adding Usluga', 'Okay', { duration: 2500 });
      },
    });
  }
  update() {
    if (!this.data.id) {
      this.snackBar.open('Error: No ID found for update', 'Okay', { duration: 2500 });
      return;
    }
    this.uslugaService.update(this.data.id, this.data).subscribe({
      next: (d) => {
        this.dialogRef.close(1);
        this.snackBar.open('Usluga updated!', 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error updating Usluga', 'Okay', { duration: 2500 });
      },
    });
  }
  delete() {
    if (!this.data.id) {
      this.snackBar.open('Error: No ID found for delete', 'Okay', { duration: 2500 });
      return;
    }
    this.uslugaService.delete(this.data.id).subscribe({
      next: () => {
        this.dialogRef.close(1);
        this.snackBar.open('Usluga deleted!', 'Okay', { duration: 2500 });
      },
      error: (e) => {
        this.snackBar.open('Error deleting Usluga', 'Okay', { duration: 2500 });
      },
    });
  }
  cancel() {
    this.dialogRef.close();
    this.snackBar.open('Operation cancelled', 'Okay', { duration: 2500 });
  }
}
