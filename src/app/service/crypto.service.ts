import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {

  constructor() { }

  /**
   * encrypt
   */
  encrypt(masterKey: string, plainText: string): string {
    const encText = CryptoJS.AES.encrypt(plainText, masterKey).toString();
    return encText
  }

  /**
   * decrypt
   */
  decrypt(masterKey: string, crypted: string): string {
    let decText = '';
    try {
      decText = CryptoJS.AES.decrypt(crypted, masterKey).toString(CryptoJS.enc.Utf8);
    } catch (e) {
      decText = '';
    }
    return decText
  }

}
