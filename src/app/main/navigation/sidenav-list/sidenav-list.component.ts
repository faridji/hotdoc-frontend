import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  loggedInUserName: string;

  constructor(private authService: AuthService) { 
    this.loggedInUserName = null;
  }

  ngOnInit() {
    this.authService.user_name.subscribe( response => {
      this.loggedInUserName = response;
    })
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
