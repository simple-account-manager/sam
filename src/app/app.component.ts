import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {environment} from '../environments/environment';
import {am_console} from './app.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.sass']
})
export class AppComponent {

  constructor(private authService: AuthService) {}

    isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
    }
}
