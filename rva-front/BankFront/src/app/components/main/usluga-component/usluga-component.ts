import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Usluga } from '../../../models/usluga';
import { UslugaService } from '../../../services/usluga.service';
import { UslugaDialogComponent } from '../../dialogs/usluga-dialog/usluga-dialog';
import { FilijalaDetailModalComponent } from '../../dialogs/filijala-detail-modal/filijala-detail-modal';
import { KorisnikDetailModalComponent } from '../../dialogs/korisnik-detail-modal/korisnik-detail-modal';

@Component({
  selector: 'app-usluga-component',
  templateUrl: './usluga-component.html',
  styleUrls: ['./usluga-component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
})
export class UslugaComponent implements OnInit {
  displayedColumns = [
    'naziv',
    'opisUsluge',
    'provizija',
    'filijalaInfo',
    'korisnikInfo',
    'actions',
  ];

  dataSource!: MatTableDataSource<Usluga>;

  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  constructor(private readonly service: UslugaService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Usluga>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {},
    });
  }

  toggleFilijalaDetails(row: Usluga): void {
    if (row.filijala?.id) {
      this.dialog.open(FilijalaDetailModalComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'fullscreen-dialog',
        data: { preselectedId: row.filijala.id },
      });
    }
  }

  toggleKorisnikDetails(row: Usluga): void {
    if (row.korisnik?.id) {
      this.dialog.open(KorisnikDetailModalComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'fullscreen-dialog',
        data: { preselectedId: row.korisnik.id },
      });
    }
  }

  openDialog(flag: number, usluga?: Usluga): void {
    const ref = this.dialog.open(UslugaDialogComponent, { data: usluga || {} });
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe((res) => {
      if (res === 1) this.loadData();
    });
  }
}
