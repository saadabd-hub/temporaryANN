import {Injectable} from '@angular/core'
import { Router , CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Role } from '../../models/role';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  public async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return await this.checkPermission(allowedUserRoles);
  }

  public async canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedUserRoles = this.getRoutePermissions(route);
    return await this.checkPermission(allowedUserRoles);
  }

  public canLoad(): Promise<boolean> {
    return this.checkPermission(null);
  }

  private getRoutePermissions(route: ActivatedRouteSnapshot): Role [] {
    if (route.data && route.data.userRoles) {
      return route.data.userRoles as Role [];
    }
    return null;
  }

  private checkPermission(allowedUserRoles: Role []): Promise<boolean> {
    return this.authService.getSession().then((session: boolean) => {
      if (session) {
        if (!allowedUserRoles) {
          return true;   // if no user roles has been set, all user are allowed to access the route
        } else {
          return this.authService.getUserRoles().then((userRoles: string[]) => {
            if (this.authService.areUserRolesAllowed(userRoles, allowedUserRoles)) {
              return true;
            } else {
              this.router.navigateByUrl('/nopermission');
              return false;
            }
          });
        }
      } else { return false; }
    });
  }

}
