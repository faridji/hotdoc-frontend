import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatDialog } from '@angular/material';
import { HotDocApiService } from 'src/app/shared/services/data.service';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  selectedRowIdx: string;

  doctors: any;
  selectedDoctor: any;
  displayedColumns: string[];
  showRowActions: boolean;
  
  constructor(private apiService: HotDocApiService, private dialog: MatDialog) { 
    this.displayedColumns = ['name', 'email', 'password', 'mob_number','education','department','experience','age'];
    this.doctors = null;
    this.selectedDoctor = null;
    this.selectedRowIdx = '';
    this.showRowActions = false;
  }

  ngOnInit() {
    this.onLoadData();
  }

  onLoadData()
  {
    this.apiService.getAllDoctors().subscribe( response => {
      this.doctors = response;
    });
  }

  onRowClick(row: any){
    this.showRowActions = true;
    this.selectedDoctor = row;
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
    dialogRef.componentInstance.patient_id = this.selectedDoctor._id;

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
        this.apiService.deletePatient(this.selectedDoctor._id).subscribe( response => {
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