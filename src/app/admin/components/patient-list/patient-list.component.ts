import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTable, MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';
import { PatientService } from 'src/app/shared/services/patient.service';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  patients: MatTableDataSource<{}>;
  displayedColumns: string[] = ['name', 'email', 'password', 'mob_number', 'age', 'address', 'actions'];
  rowActions: any[];

  selectedRowIdx: string;
  loading: boolean;
  
  constructor(private apiService: PatientService, private dialog: MatDialog) { 
    this.patients = null;
    this.rowActions = [
      { title: 'Edit', icon: 'edit', action: 'OnEdit' },
      { title: 'Delete', icon: 'delete', action: 'OnDelete' },

    ];

    this.loading = false;

    this.selectedRowIdx = '';
  
  }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData()
  {
    this.loading = true;
    this.apiService.getAll().subscribe( response => {
      const data: any = response;
      this.patients = new MatTableDataSource(data);
      this.patients.paginator = this.paginator;
      this.loading = false;
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
  //   this.selectedPatient = row;
  //   this.selectedRowIdx = row._id;
  // }

  onTableRefresh()
  {
    this.onLoadData();
    this.table.renderRows();
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '50vw',
      minWidth: '50vw'
    });

    dialogRef.componentInstance.inDialog = true;

    dialogRef.afterClosed().subscribe(response => {
      if (response.addPatient)
      {
        AlertsService.success('Create', 'Patient Successfully Added.').subscribe( resp => {
          if (resp.positive) this.onTableRefresh();
        })
      }
    })
  }

  onUpdate(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '50vw',
      minWidth: '50vw'
    });
    dialogRef.componentInstance.patient_id = this.selectedRowIdx;

    dialogRef.afterClosed().subscribe(response => {
      if (response.editPatient)
      {
        AlertsService.success('Updated', 'Patient Successfully Updated.').subscribe( resp => {
          if (resp.positive) this.onTableRefresh();
        })
      }
    })
  }

  onDelete(): void {
    AlertsService.confirmWithInput('Are you sure to Delete?', 'Comments', false)
    .subscribe( response => {
      if (response.positive)
      {
        this.apiService.delete(this.selectedRowIdx).subscribe( response => {
          AlertsService.success('Delete', 'Patient Successfully deleted.').subscribe( resp => {
            if (resp.positive) {
              this.onTableRefresh();
            }
          });
        }, (error: HttpErrorResponse) => {
          AlertsService.error('Error', error.message);
        })
      }
    });
  }
}
