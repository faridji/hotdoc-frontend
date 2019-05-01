import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class patientAuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){}

    canActivate(route, state: RouterStateSnapshot): boolean{

        const token = this.authService.getCurrentUser();
        if (token && !token['isAdmin']) return true;

        this.router.navigate(['patient-signIn'], { queryParams: { returnUrl: state.url } });

        return false;
    }
    
}