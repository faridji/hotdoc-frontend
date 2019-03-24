import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  doctors: any[] = [
    {
      id: 1,
      image: '/assets/images/doctor.jpg',
      name: 'Dr Ihsan ullah',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        },
        { id: 2, 
          title: 'FCPS'
        }
      ], 
    },
    {
      id: 2,
      image: '/assets/images/doctor2.jpg',
      name: 'Dr Saleem',
      degrees: [
        {
          id: 1,
          title: 'MBBS'
        },
        {
          id: 2,
          title: 'FCPS'
        },
        {
          id: 3,
          title: 'Neuro Surgon'
        },
        {
          id: 4,
          title: 'MD'
        }
      ], 
    },
    {
      id: 3,
      image: '/assets/images/doctor3.jpg',
      name: 'Dr Sonaila',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        },
        { id: 2, 
          title: 'FCPS'
        },
        {
          id: 3,
          title: 'DO'
        }
      ], 
    },
    {
      id: 4,
      image: '/assets/images/doctor4.jpg',
      name: 'Dr anayat',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        },
        { id: 2, 
          title: 'FCPS'
        },
        {
          id: 3,
          title: 'DO'
        }
      ], 
    },
    {
      id: 5,
      image: '/assets/images/doctor5.jpg',
      name: 'Dr Essa',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        }
      ], 
    },
    {
      id: 6,
      image: '/assets/images/farid.jpg',
      name: 'Dr Farid ullah',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        }
      ], 
    },
    {
      id: 7,
      image: '/assets/images/doctor6.jpg',
      name: 'Dr Javeed Ihsan',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        }
      ], 
    },
    {
      id: 8,
      image: '/assets/images/sohail.jpg',
      name: 'Dr Sohail Ahmad',
      degrees: [
        { id: 1, 
          title: 'MBBS'
        }
      ], 
    },
    
  ]


  constructor(private router: Router) { }

  ngOnInit() {
  }

  doctorDetail(id: string) {
    this.router.navigate(['doctors', id])
  }

}
