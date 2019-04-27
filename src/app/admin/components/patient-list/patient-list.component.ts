import { Component, OnInit, ViewChild } from '@angular/core';
import { HotDocApiService } from 'src/app/shared/services/data.service';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTable, MatDialog } from '@angular/material';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  patients: any;
  selectedPatient: any;
  displayedColumns: string[] = ['name', 'email', 'password', 'mob_number', 'age', 'address'];
  showRowActions: boolean;

  selectedRowIdx: string;
  
  constructor(private apiService: HotDocApiService, private dialog: MatDialog) { 
    this.patients = null;
    this.selectedPatient = null;
    this.showRowActions = false;

    this.selectedRowIdx = '';
  }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData()
  {
    this.apiService.getAllPatients().subscribe( response => {
      this.patients = response;
    });
  }

  onRowClick(row: any){
    this.showRowActions = true;
    this.selectedPatient = row;
    this.selectedRowIdx = row._id;

  }

  onTableRefresh()
  {
    this.onLoadData();
    this.table.renderRows();
  }

  onAdd(): void {
    const dialog = this.dialog.open(SignUpComponent, {
      width: '50vw',
      minWidth: '50vw'
    });
  }

  onUpdate(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '50vw',
      minWidth: '50vw'
    });
    dialogRef.componentInstance.patient_id = this.selectedPatient._id;

    dialogRef.afterClosed().subscribe(response => {
      if (response.edit)
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
        this.apiService.deletePatient(this.selectedPatient._id).subscribe( response => {
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
