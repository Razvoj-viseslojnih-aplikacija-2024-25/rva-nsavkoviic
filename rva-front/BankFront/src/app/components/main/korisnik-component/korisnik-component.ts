import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { KorisnikUsluge } from '../../../models/korisnik';
import { KorisnikService } from '../../../services/korisnik.service';
import { KorisnikDialogComponent } from '../../dialogs/korisnik-dialog/korisnik-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-korisnik-component',
  templateUrl: './korisnik-component.html',
  styleUrls: ['./korisnik-component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class KorisnikUslugeComponent implements OnInit {
  displayedColumns = ['id', 'ime', 'prezime', 'maticniBroj', 'actions'];
  dataSource!: MatTableDataSource<KorisnikUsluge>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly service: KorisnikService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getAll().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<KorisnikUsluge>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {},
    });
  }

  openDialog(flag: number, korisnik?: KorisnikUsluge): void {
    const ref = this.dialog.open(KorisnikDialogComponent, { data: korisnik || {} });
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe((res) => {
      if (res === 1) this.loadData();
    });
  }
}
