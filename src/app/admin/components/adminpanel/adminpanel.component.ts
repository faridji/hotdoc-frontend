import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  menu: any[];
  constructor() {
    this.menu = ['Dashboard', 'Doctors', 'Patients', 'Departments'];
  }

  ngOnInit() {
    
  }

}
