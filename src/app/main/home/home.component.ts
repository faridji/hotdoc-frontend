import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user)
    {
      this.authService.user_name.next(user.name);
      if (user.isAdmin)
        this.router.navigate(['admin']);
    }
  }
}
