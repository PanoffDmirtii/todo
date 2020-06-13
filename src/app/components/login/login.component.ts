import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.url = this.authService.urlModalAuth();
  }

}
