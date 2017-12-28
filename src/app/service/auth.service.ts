import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {CryptoService} from './crypto.service';
import {KeyService} from './key.service';
import {am_console} from '../app.util';
import { AmConst } from '../util/am.const';

@Injectable()
export class AuthService implements CanActivate {

  private masterkey = '';
  private theBoss = 'IamTheBossBitches';

  constructor(private router: Router,
              private cryptoService: CryptoService,
              private snackBar: MatSnackBar,
              private keyService: KeyService) {
    am_console.log('AuthService Init');
  }

  login(masterkey: string): boolean {
    if (this.checkMasterKey(masterkey)) {
      this.masterkey = masterkey;
      return true;
    } else {
      return false;
    }
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
    if (this.masterkey === '') {
      return false;
    } else {
      return true;
    }
  }

  logout(): void {
    this.masterkey = '';
  }

  checkMasterKey(masterKey: string): boolean {
    const loginPass = localStorage.getItem(this.theBoss);
    if (loginPass === null) {
      // the first login
      localStorage.setItem(this.theBoss, this.cryptoService.encrypt(masterKey, this.theBoss));
      this.openSnackBar(AmConst.first_login, null, 6000);
      this.keyService.setMasterkey(masterKey);
      return true;
    } else {
      // login
      if (this.theBoss === this.cryptoService.decrypt(masterKey, loginPass)) {
        // success
        this.keyService.setMasterkey(masterKey);
        this.keyService.loadKeyFromLocalStorage();
        this.openSnackBar(AmConst.welcomeText, null, 3000);
        return true;
      } else {
        // error
        return false;
      }
    }
  }

  getMasterkey(): string {
    return this.masterkey;
  }

  openSnackBar(msg: string, action: string, duration: number) {
    this.snackBar.open(msg, action, {duration});
  }
}
