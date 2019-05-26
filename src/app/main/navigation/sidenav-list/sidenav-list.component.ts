import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material';
import { SignUpComponent } from 'src/app/membership/sign-up/sign-up.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  user: User;
  constructor(private authService: AuthService, private dialog: MatDialog) { 
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

  signUp()
  {
    this.sidenavClose.emit();
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '100vw',
      minWidth: '100vw',
      height: '100vh',
      minHeight: '100vh'
    });

    dialogRef.componentInstance.inDialog = true;
  }
}
