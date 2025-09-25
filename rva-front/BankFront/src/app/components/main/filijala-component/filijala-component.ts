import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Filijala } from '../../../models/filijala';
import { FilijalaService } from '../../../services/filijala.service';
import { FilijalaDialogComponent } from '../../dialogs/filijala-dialog/filijala-dialog';
import { BankaDetailModalComponent } from '../../dialogs/banka-detail-modal/banka-detail-modal';

@Component({
  selector: 'app-filijala-component',
  templateUrl: './filijala-component.html',
  styleUrls: ['./filijala-component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    CommonModule,
  ],
})
export class FilijalaComponent implements OnInit {
  displayedColumns = ['adresa', 'brojPultova', 'posedujeSef', 'bankaInfo', 'actions'];
  dataSource!: MatTableDataSource<Filijala>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private readonly filijalaService: FilijalaService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.filijalaService.getAll().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Filijala>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (e) => {},
    });
  }

  toggleBankDetails(row: Filijala): void {
    if (row.banka?.id) {
      this.dialog.open(BankaDetailModalComponent, {
        width: '100vw',
        height: '100vh',
        maxWidth: '100vw',
        maxHeight: '100vh',
        panelClass: 'fullscreen-dialog',
        data: { preselectedId: row.banka.id },
      });
    }
  }

  // Predicate functions for row templates
  isDataRow = (index: number, item: any): boolean => {
    return item && typeof item === 'object' && item.id !== undefined;
  };

  openDialog(flag: number, filijala?: Filijala): void {
    const ref = this.dialog.open(FilijalaDialogComponent, { data: filijala || {} });
    ref.componentInstance.flag = flag;
    ref.afterClosed().subscribe((res) => {
      if (res === 1) this.loadData();
    });
  }
}
