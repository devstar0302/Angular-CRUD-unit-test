import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  
  constructor(private _router:Router, private appService: AppService  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.appService.isLoggedin) {
        return true;
      }
      else {
        return this._router.navigate([""]);
      }
  }
}
