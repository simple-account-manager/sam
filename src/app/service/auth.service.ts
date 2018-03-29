import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CryptoService } from './crypto.service';
import { KeyService } from './key.service';
import { am_console } from '../app.util';
import { AmConst } from '../util/am.const';

@Injectable()
export class AuthService implements CanActivate {

  private theBoss = 'IamTheBossBitches';
  private _isAuthenticated = false;

  constructor(private router: Router,
              private cryptoService: CryptoService,
              private snackBar: MatSnackBar,
              private keyService: KeyService) {
    am_console.log('AuthService Init');
  }

  login(masterkey: string): boolean {
    this._isAuthenticated = this.checkMasterKey(masterkey);
    return this._isAuthenticated;
  }

  logout(): void {
    this._isAuthenticated = false;
    this.keyService.setMasterkey('');
    this.router.navigate(['/login']);
  }

  canActivate(route) {
    am_console.log('AuthService#canActivate called');
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  checkMasterKey(masterKey: string): boolean {
    const loginPass = localStorage.getItem(this.theBoss);
    if (loginPass === null) {
      // the first login
      localStorage.setItem(this.theBoss, this.cryptoService.encrypt(masterKey, this.theBoss));
      this.openSnackBar(AmConst.first_login, null, 10000);
      this.keyService.setMasterkey(masterKey);
      return true;
    } else {
      // login
      if (this.theBoss === this.cryptoService.decrypt(masterKey, loginPass)) {
        // success
        this.keyService.setMasterkey(masterKey);
        this.keyService.loadKeyFromLocalStorage();
        this.openSnackBar(AmConst.welcomeText, null, 4000);
        return true;
      } else {
        // error
        return false;
      }
    }
  }

  openSnackBar(msg: string, action: string, duration: number) {
    this.snackBar.open(msg, action, {duration});
  }
}
