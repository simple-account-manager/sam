import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {MdSnackBar, MdSnackBarConfig} from '@angular/material';
import {am_console} from '../app.util';
import { AmConst } from '../util/am.const';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.sass']
})
export class LoginComponent implements OnInit {

  hidePw = true;
  errorMessage = '';
  masterkey = 'hello';
  failCount: number;

  constructor(private router: Router, private authService: AuthService, private snackBar: MdSnackBar) {
    am_console.log('LoginComponent Init / failCount is set to 0');
    this.failCount = 0;
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

  validate(masterkey: string): string {
    if (masterkey.length === 0) {
      return AmConst.validateMasterkey;
    } else if (masterkey.length < 5) {
      return AmConst.validate5long;
    } else {
      return '';
    }
  }

  /**
   * if login fails more that 3 times -> show reset button
   */
  handleLoginError() {
    if (this.failCount === 2) {
      this.snackBar.open(AmConst.snackResetAccount, AmConst.snackYES, {duration: 3000})
        .onAction().subscribe(() => localStorage.clear());
    } else {
      this.snackBar.open(AmConst.snackLoginFail, null, {duration: 2000});
      this.failCount++;
    }
  }

  clear() {
    window.localStorage.clear();
  }
}
