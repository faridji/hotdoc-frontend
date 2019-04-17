import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'doctor-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  id: any;
  doctor_details : any;
  constructor(private route: ActivatedRoute, private router: Router) 
  { 
    this.doctor_details = {};
  }

  ngOnInit() 
  {
    this.id = this.route.snapshot.paramMap.get('id');
    
    this.doctor_details = {
      name: 'Dr Dilawer khan',
      image: '/assets/images/doctor2.jpg',
      education: ['MBBS', 'FCPS'],
      experience: 4,
      email: 'dilawer_mbbs@gmail.com',
      mob_number: '03439295109'
    }
  }

  makeAppointment()
  {
    this.router.navigate(['/appointments'])
  }
}
