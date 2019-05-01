import { Component, OnInit } from "@angular/core";
import { AlertsService } from './shared/alerts/alerts.service';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent implements OnInit{
  constructor(private alertService: AlertsService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user)
    {
      this.authService.user_name.next(user.name);
      if (user.isAdmin)
        this.router.navigate(['admin']);
    }
  }
}
