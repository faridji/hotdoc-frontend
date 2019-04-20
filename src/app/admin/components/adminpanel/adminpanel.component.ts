import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  menu: any[];
  selectedMenu: any;
  constructor() {
    this.menu = ['Dashboard', 'Doctors', 'Patients', 'Departments'];
    this.selectedMenu = this.menu[0];
  }

  ngOnInit() {
    
  }

  selectedMenuChanged(menu: any)
  {
    this.selectedMenu = menu;
  }

}
