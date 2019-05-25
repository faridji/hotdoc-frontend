import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'doctor-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DoctorDetailComponent implements OnInit {

  id: any;
  doctor_details : any;
  constructor(private route: ActivatedRoute, private router: Router, private doctorService: DoctorService) 
  { 
    this.doctor_details = {};
  }

  ngOnInit() 
  {
    this.id = this.route.snapshot.paramMap.get('id');
    this.doctorService.get(this.id).subscribe( resp => {
      this.doctor_details = resp;
    });
  }

  makeAppointment()
  {
    this.doctorService.doctor_data.next(
    { 
      name: this.doctor_details.name,
      dept: this.doctor_details.department
    });

    this.router.navigate(['/appointments'])
  }
}
