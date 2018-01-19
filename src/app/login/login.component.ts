import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { am_console } from '../app.util';
import { AmConst } from '../util/am.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.sass']
})
export class LoginComponent implements OnInit {

  hidePw = true;
  errorMessage = '';
  masterkey =  environment.production ? '' : 'hello';
  failCount = 0;
  isDev = !environment.production;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    am_console.log('LoginComponent Init / failCount is set to 0');
  }

  ngOnInit() {
  }

  login() {
    this.errorMessage = this.validate(this.masterkey);
    if (this.errorMessage.length === 0) {
      if (this.authService.login(this.masterkey)) {
        this.router.navigate(['/keylist']);
      } else {
        this.handleLoginError();
      }
    }
  }
  /** in order to make the ripple effect visual @zorlu */
  loginDelayed() {
    setTimeout(() => this.login(), 300);
  }

  validate(masterkey: string): string {
    if (masterkey.length === 0) {
      return AmConst.validate_masterkey;
    } else if (masterkey.length < 5) {
      return AmConst.validate_5_long;
    } else {
      return '';
    }
  }

  /**
   * if login fails more that 3 times -> show reset button
   */
  handleLoginError() {
    if (this.failCount === 2) {
      this.snackBar.open(AmConst.snack_reset_account, AmConst.snack_YES, {duration: 3000})
        .onAction().subscribe(() => localStorage.clear());
    } else {
      this.snackBar.open(AmConst.snack_login_fail, null, {duration: 2000});
      this.failCount++;
    }
  }

  clear() {
    if (!environment.production) {
      window.localStorage.clear();
    }
  }
}