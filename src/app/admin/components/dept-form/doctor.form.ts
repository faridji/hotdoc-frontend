import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertsService } from 'src/app/shared/alerts/alerts.service';
import { DeptService } from 'src/app/shared/services/dept.service';


@Component({
  selector: 'dept-form',
  templateUrl: './doctor-form.html',
  styleUrls: ['./doctor-form.css']
})
export class DepartmentFormComponent implements OnInit {

  theForm: FormGroup;
  dept_id: string;

  constructor(private fb: FormBuilder, 
              private apiService: DeptService,
              private dialogRef: MatDialogRef<DepartmentFormComponent>) 
  {
    this.theForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
    });

    this.dept_id = null;
  }

  ngOnInit() {

    if (this.dept_id !== null)
    {
      this.loadDoctorData();
    }
  }

  loadDoctorData()
  {
    this.apiService.get(this.dept_id).subscribe( response => {
      this.theForm.patchValue(response);
    })
  }

  get name() {
    return this.theForm.get('name');
  }

  get description() {
    return this.theForm.get('description');
  }

  private getChangedProperties(form: any): any {
    let changedProperties = {};
  
    Object.keys(form.controls).forEach((name) => {
      let currentControl = form.get(name);  
      
      if (currentControl.dirty)
        changedProperties[name] = currentControl.value;
    });
  
    return changedProperties;
  }

  onCancel(){
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.dept_id !== null)
    {
      this.apiService.update(this.dept_id, this.theForm.value).subscribe( response => {
        this.dialogRef.close({ editDepartment: true });

      }, (error: HttpErrorResponse) => {
        AlertsService.error('Error', error.error);
      })
    }
    else 
    {
      const formData = this.getChangedProperties(this.theForm);
      this.apiService.add(formData).subscribe( (response) => {
        this.dialogRef.close({ addDepartment: true });

      }, (error: HttpErrorResponse) => {
        AlertsService.error(error.statusText, error.error);
      });
    } 
  }
}