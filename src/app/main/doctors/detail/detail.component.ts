import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'doctor-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  id: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('Id ->', this.id);
  }
}
