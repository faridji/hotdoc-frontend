import { Component, OnInit, ViewChild } from '@angular/core';
import { DeptService } from 'src/app/shared/services/dept.service';
import { MatTable, MatDialog } from '@angular/material';
import { DoctorFormComponent } from '../doctor-form/doctor.form';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DepartmentFormComponent } from '../dept-form/doctor.form';

@Component({
  selector: 'app-dept-list',
  templateUrl: './dept-list.component.html',
  styleUrls: ['./dept-list.component.css']
})
export class DeptListComponent implements OnInit {

  @ViewChild(MatTable) table: MatTable<any>;
  selectedRowIdx: string;

  departments: any;
  displayedColumns: string[];
  rowActions: any[];

  loading: boolean;
  
  constructor(private apiService: DeptService, private dialog: MatDialog) { 
    this.displayedColumns = ['name', 'description', 'actions'];
    this.departments = null;
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
      this.departments = response;
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
  //   this.selectedDepartment = row;
  //   this.selectedRowIdx = row._id;
  // }

  onTableRefresh()
  {
    this.onLoadData();
    this.table.renderRows();
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(DepartmentFormComponent, {
      width: '50vw',
      minWidth: '50vw'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response.addDepartment)
      {
        AlertsService.success('Created', 'Department Successfully Added.').subscribe( resp => {
          if (resp.positive) this.onTableRefresh();
        })
      }
    });
  }

  onUpdate(): void {
    const dialogRef = this.dialog.open(DepartmentFormComponent, {
      width: '50vw',
      minWidth: '50vw'
    });
    dialogRef.componentInstance.dept_id = this.selectedRowIdx

    dialogRef.afterClosed().subscribe(response => {
      if (response.editDepartment)
      {
        AlertsService.success('Updated', 'Department Successfully Updated.').subscribe( resp => {
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
          AlertsService.success('Delete', 'Department Successfully deleted.').subscribe( resp => {
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
