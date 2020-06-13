import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {VkApiService} from './vk-api.service';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private http: HttpClient,
    private vkService: VkApiService
  ) {
  }

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigateByUrl('login');
      return false;
    }
    return true;
  }
}
