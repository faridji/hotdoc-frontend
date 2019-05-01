import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  user: User;

  constructor(private authService: AuthService) { 
    this.user = null;
  }

  ngOnInit() {
    this.authService.user.subscribe( (response: User) => {
      this.user = response;
    })
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
}
