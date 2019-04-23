import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class adminAuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){}

    canActivate(route, state: RouterStateSnapshot): boolean{

        const token = this.authService.getUser();
        if (token && token['isAdmin']) return true;

        this.router.navigate(['admin-signIn']);

        return false;
    }
    
}