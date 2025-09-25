import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Banka } from '../../../models/banka';
import { BankaService } from '../../../services/banka.service';
import { BankaDialogComponent } from '../../dialogs/banka-dialog/banka-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banka-component',
  templateUrl: './banka-component.html',
  styleUrls: ['./banka-component.scss'],
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
export class BankaComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'kontakt', 'pib', 'actions'];
  dataSource!: MatTableDataSource<Banka>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly bankaService: BankaService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.bankaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Banka>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (error) => {},
    });
  }

  openDialog(flag: number, banka?: Banka): void {
    const ref = this.dialog.open(BankaDialogComponent, { data: banka || {} });
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe((res) => {
      if (res === 1) this.loadData();
    });
  }
}
