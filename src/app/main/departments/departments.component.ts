import { Component, OnInit } from '@angular/core';
import { DeptService } from 'src/app/shared/services/dept.service';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any;

  constructor(private apiService: DeptService) { 
    this.departments = [];
  }

  ngOnInit() {
    this.apiService.getAll().subscribe( resp => {
      this.departments = resp;
    })
  }

}
