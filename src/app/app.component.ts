import { Component } from "@angular/core";
import { AlertsService } from './shared/alerts/alerts.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})

export class AppComponent {
  constructor(private alertService: AlertsService) {
  }
}
