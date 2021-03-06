import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctorFormComponent } from '../doctor-form/doctor.form';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  selectedRowIdx: string;

  doctors: any;
  displayedColumns: string[];
  rowActions: any[];

  loading: boolean;
  
  constructor(private apiService: DoctorService, private dialog: MatDialog) { 
    this.displayedColumns = ['name', 'email', 'mob_number','education','department','experience', 'actions'];
    this.doctors = null;
    this.selectedRowIdx = '';
    this.loading = false;

    this.rowActions = [
      { title: 'Edit', icon: 'edit', action: 'OnEdit' },
      { title: 'Delete', icon: 'delete', action: 'OnDelete' },

    ];
  }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData()
  {
    this.loading = true;
    this.apiService.getAll().subscribe( response => {
      this.loading = false;
      this.doctors = response;
    });
  }

  onReload()
  {
    this.onLoadData();
  }

  onRowAction(ev: any, row: any, rowAction: RowAction)
  {
      console.log('row', row);
      this.selectedRowIdx = row._id;

      if (rowAction.action === 'OnEdit')
      {
        this.onUpdate();
      }
      if (rowAction.action === 'OnDelete')
      {
        this.onDelete();
      }
  }

  // onRowClick(row: any){
  //   this.showRowActions = true;
  //   this.selectedDoctor = row;
  //   this.selectedRowIdx = row._id;
  // }

  onTableRefresh()
  {
    this.onLoadData();
    this.table.renderRows();
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(DoctorFormComponent, {
      width: '50vw',
      minWidth: '50vw'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response.addDoctor)
      {
        AlertsService.success('Created', 'Doctor Successfully Added.').subscribe( resp => {
          if (resp.positive) this.onTableRefresh();
        })
      }
    });
  }

  onUpdate(): void {
    const dialogRef = this.dialog.open(DoctorFormComponent, {
      width: '50vw',
      minWidth: '50vw'
    });
    dialogRef.componentInstance.doctor_id = this.selectedRowIdx;

    dialogRef.afterClosed().subscribe(response => {
      if (response.editDoctor)
      {
        AlertsService.success('Updated', 'Doctor Successfully Updated.').subscribe( resp => {
          if (resp.positive) this.onTableRefresh();
        })
      }
    });
  }

  onDelete(): void {
    AlertsService.confirmWithInput('Are you sure to Delete?', 'Comments', false)
    .subscribe( response => {
      if (response.positive)
      {
        this.apiService.delete(this.selectedRowIdx).subscribe( response => {
          AlertsService.success('Delete', 'Doctor Successfully deleted.').subscribe( resp => {
            if (resp.positive) {
              this.onTableRefresh();
            }
          });
        }, (error: HttpErrorResponse) => {
          AlertsService.error('Error', error.error);
        })
      }
    });
  }

}