import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //Check local storage for user
    //If user is logged in, return true
    //If user is not logged in, return false
    const user = localStorage.getItem('usuario');

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    this.router.navigate(['/ficha_clinica']);
    return true;


  }

}
