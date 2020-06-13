import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VkApiService {
  private apiUrl = 'https://api.vk.com/method';


  constructor(
    private http: HttpClient
  ) { }

  getVkUser(userId): Observable<any> {
    return this.http.get(`${this.apiUrl}/users.get?user_ids=${userId}&fields=photo_200_orig&access_token=${localStorage.getItem('access_token')}&v=5.110`);
  }
}
