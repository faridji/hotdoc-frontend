import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: any[] = [
    {
      id: 1,
      image: '/assets/images/peds.jpg',
      name: 'Pediatric',
      detail: 'This is department Description.'
    },
    {
      id: 2,
      image: '/assets/images/cardiology.jpg',
      name: 'Cardialogy',
      detail: 'Increasing heart diseases in current era have added special emphasis to the field of heart care. For healthy life, it is crucial and sensitive; and needs extra care. The team of cardiologists, nurses and other specialists at MIH ensure collectively dedicated efforts to providing a full spectrum of cardiac services for patients with congenital heart disease and other rare heart conditions.', 
    },    
  ]

  constructor() { }

  ngOnInit() {
  }

}
