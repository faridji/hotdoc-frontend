import { Component, OnInit } from '@angular/core';
import { DashboardApiService } from 'src/app/shared/services/dashboard-api.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  getAllCounts: any;
  
  lat: number = 33.6844;
  lng: number = 73.0479;
  
  constructor(private dashboardApi: DashboardApiService) {
    this.getAllCounts = {};
   }

  ngOnInit() {
    this.dashboardApi.getAllCounts().subscribe(resp => {
      this.getAllCounts = resp;
    });
  }

}
