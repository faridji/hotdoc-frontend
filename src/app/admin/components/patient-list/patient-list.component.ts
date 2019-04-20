import { Component, OnInit, ViewChild } from '@angular/core';
import { HotDocApiService } from 'src/app/shared/services/data.service';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MatTable } from '@angular/material';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;

  patients: any;
  selectedPatient: any;
  displayedColumns: string[] = ['name', 'email', 'password', 'mob_number', 'age'];
  showRowActions: boolean;
  
  constructor(private apiService: HotDocApiService) { 
    this.patients = null;
    this.selectedPatient = null;
    this.showRowActions = false;
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
  }

  onTableRefresh()
  {
    this.onLoadData();
    this.table.renderRows();
  }

  onAdd(): void {
    console.log('Selected Patient -> ', this.selectedPatient);
  }

  onUpdate(): void {
    console.log('Selected Patient -> ', this.selectedPatient);
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
