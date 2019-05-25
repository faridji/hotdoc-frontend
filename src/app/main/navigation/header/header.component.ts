import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  user: User;
  
  constructor(private router: Router, private authService: AuthService, private dialog: MatDialog) { }
 
  ngOnInit() {
    this.authService.user.subscribe( (response: User) => {
      this.user = response;
    })
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  signUp() {
    const dialog = this.dialog.open(SignUpComponent, {
      width: '40vw',
      minWidth: '40vw'
    });

  }

  logout()
  {
    this.authService.logout();
  }

}
