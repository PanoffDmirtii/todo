import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userID;
  private token: string;

  private authUrl = 'https://oauth.vk.com/';
  private clientId = 7509359;
  private redirectUri = 'https://PanoffDmirtii.github.io/todo/auth';
  private secret = '3CTyujmNGrI6C3j4aZKq';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('login');
  }

  login(code) {
    this.getToken(code).subscribe(
      response => {
        this.token = response.access_token;
        this.userID = response.user_id;
        localStorage.setItem('access_token', this.token);
        this.router.navigateByUrl('/');
        this.toast.success('OK');
      },
      err => {
        console.log(err);
        this.toast.error('Something was wrong...');
      }
    );
  }

  urlModalAuth(): string {
    return `${this.authUrl}authorize?client_id=${this.clientId}&display=page&redirect_uri=${this.redirectUri}&scope=offline&response_type=code&v=5.110`;
  }


  getToken(code: string): Observable<any> {
    return this.http.get(
      `${this.authUrl}access_token?client_id=${this.clientId}&client_secret=${this.secret}&redirect_uri=${this.redirectUri}&code=${code}`);
  }
}
