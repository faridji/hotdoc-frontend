import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  user: User;
  
  constructor(private router: Router, private authService: AuthService) { }
 
  ngOnInit() {
    this.authService.user.subscribe( (response: User) => {
      this.user = response;
    })
  }
 
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  signUp() {
    this.router.navigate(['/sign-up'])
  }

  logout()
  {
    this.authService.logout();
  }

}
