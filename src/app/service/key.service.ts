import { Injectable, EventEmitter, ViewChild } from '@angular/core';
import { AuthService } from './auth.service';
import { MatSnackBar, MatMenuTrigger, MatSnackBarConfig } from '@angular/material';
import { KeyObjModel } from '../model/key.model';
import { CryptoService } from './crypto.service';
import { am_console } from '../app.util';
import { AmConst } from '../util/am.const';

@Injectable()
export class KeyService {

  KEY = 'dataObj';
  private dataMap = new Map<number, KeyObjModel>();
  private masterKey: string;

  dataMapUpdated: EventEmitter<Map<number, KeyObjModel>> = new EventEmitter();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private snackBar: MatSnackBar, private cryptoService: CryptoService) {}

  loadKeyFromLocalStorage() {
    const tmp = localStorage.getItem(this.KEY);
    if (tmp !== null) {
      this.dataMap = this.generateMapFromEncryped(tmp);
      am_console.log('Load Key', this.dataMap);
    }
  }

  generateMapFromEncryped(encrypedStr: string): Map<number, KeyObjModel> {
    const jsonStr = this.cryptoService.decrypt(this.masterKey, encrypedStr);
    return new Map<number, KeyObjModel>(JSON.parse(jsonStr));
  }

  setMasterkey(masterKey: string) {
    this.masterKey = masterKey;
  }

  saveKeyLocalStorage(): void {
    // this.testKey();
    const encryptedMap = this.cryptoService.encrypt(this.masterKey, JSON.stringify(Array.from(this.dataMap)));
    localStorage.setItem(this.KEY, encryptedMap);
    this.triggerUpdate();
  }

  testKey() {
    for (let i = 0; i < 10; i++) {
      const tmp = new KeyObjModel();
      tmp.type = 'Account';
      tmp.title = i + '';
      tmp.user = i + '';
      tmp.pass = i + '';
      this.dataMap.set(i, tmp);
    }
  }

  saveKeyToMap(data: KeyObjModel) {
    am_console.log('Save keyObj to Map: ', data);
    // prepare data to save
    if (typeof data.created === 'undefined') {
      data.created = Date.now();
    }
    // encrypt data
    this.encryptKeyObj(data);

    this.dataMap.set(data.created, data);
    this.saveKeyLocalStorage();
  }

  delete(id: number) {
    const data = this.dataMap.get(id);
    if (typeof data !== 'undefined') {
      this.dataMap.delete(id);
      this.saveKeyLocalStorage();
      this.openSnackBarUndo(data);
    }
  }

  triggerUpdate() {
    this.dataMapUpdated.emit(this.dataMap);
  }

  getDataMap() {
    return this.dataMap;
  }

  private encryptKeyObj(keyObj: KeyObjModel) {
    if (keyObj.type === 'Account') {
      keyObj.user = this.cryptoService.encrypt(this.masterKey + keyObj.created, keyObj.user);
      keyObj.pass = this.cryptoService.encrypt(this.masterKey + keyObj.created, keyObj.pass);
    } else {
      keyObj.text = this.cryptoService.encrypt(this.masterKey + keyObj.created, keyObj.text);
    }
  }

  decryptKeyObj(keyObj: KeyObjModel) {
    if (keyObj.type === 'Account') {
      keyObj.user = this.cryptoService.decrypt(this.masterKey + keyObj.created, keyObj.user);
      keyObj.pass = this.cryptoService.decrypt(this.masterKey + keyObj.created, keyObj.pass);
    } else {
      keyObj.text = this.cryptoService.decrypt(this.masterKey + keyObj.created, keyObj.text);
    }
  }

  openSnackBarUndo(deletedData: KeyObjModel) {
    this.snackBar.open(deletedData.type + AmConst.deleted, AmConst.undo, {duration: 200000}).onAction().subscribe(() => {
      this.dataMap.set(deletedData.created, deletedData);
      this.saveKeyLocalStorage();
    });
  }
}
