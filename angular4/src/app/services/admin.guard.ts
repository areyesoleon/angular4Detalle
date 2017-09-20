import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from "./user.service";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private _router:Router,
    private _userService:UserService
  ) {

  }
  canActivate(){
    let identity = this._userService.getIdentity();
    if(identity && identity.role == 'ROLE_ADMIN'){
      return true;
    }
    else{
      this._router.navigate(['/home']);
      return false;
    }
  }
}
