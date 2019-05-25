import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/shared/services/dept.service';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any;
  loading: boolean;

  constructor(private apiService: DeptService) { 
    this.departments = [];
    this.loading = false;
  }

  ngOnInit() {
    this.loading = true;
    this.apiService.getAll().subscribe( resp => {
      this.departments = resp;
      this.loading = false;
    })
  }

}
