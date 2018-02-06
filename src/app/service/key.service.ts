import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { KeyObjModel } from '../model/key.model';
import { CryptoService } from './crypto.service';
import { am_console } from '../app.util';
import { AmConst } from '../util/am.const';
import { SamModel } from 'app/model/sam.model';

@Injectable()
export class KeyService {

  public KEY = 'dataObj';
  private _data: SamModel;
  private _masterKey: string;

  dataMapUpdated: EventEmitter<Map<number, KeyObjModel>> = new EventEmitter();

  constructor(private snackBar: MatSnackBar, private cryptoService: CryptoService) {
    this._data = new SamModel();
  }

  public loadKeyFromLocalStorage() {
    const tmp = localStorage.getItem(this.KEY);
    if (tmp !== null) {
      this._data = this.generateObjFromEncryped(tmp);
      am_console.log('Load Key', this._data);
    }
  }
  /** called also by import */
  public generateObjFromEncryped(encrypedStr: string): SamModel {
    const jsonStr = this.cryptoService.decrypt(this._masterKey, encrypedStr);
    let tmpData = JSON.parse(jsonStr) as SamModel;
    tmpData.mapData = new Map<number, KeyObjModel>(JSON.parse(tmpData.encryptedData));
    tmpData.encryptedData = '';
    return tmpData;
  }
  /** authentication was successful */
  public setMasterkey(masterKey: string) {
    this._masterKey = masterKey;
  }

  /** called also by import */
  public saveKeyLocalStorage(): void {
    const encryptedObj = this.cryptoService.encrypt(this._masterKey, JSON.stringify(this.genarateSaveObj()));
    localStorage.setItem(this.KEY, encryptedObj);
    this.triggerUpdate();
  }

  public saveKeyToMap(data: KeyObjModel) {
    am_console.log('Save keyObj to Map: ', data);
    // prepare data to save
    if (typeof data.created === 'undefined') {
      data.created = Date.now();
    }
    // encrypt data
    this.encryptKeyObj(data);

    this._data.mapData.set(data.created, data);
    this.saveKeyLocalStorage();
  }

  public delete(id: number) {
    const data = this._data.mapData.get(id);
    if (typeof data !== 'undefined') {
      this._data.mapData.delete(id);
      this.saveKeyLocalStorage();
      this.openSnackBarUndo(data);
    }
  }

  public getDataMap() {
    return this._data.mapData;
  }

  /** decrypt for display */
  public decryptKeyObj(keyObj: KeyObjModel) {
    if (keyObj.type === 'Account') {
      keyObj.user = this.cryptoService.decrypt(this._masterKey + keyObj.created, keyObj.user);
      keyObj.pass = this.cryptoService.decrypt(this._masterKey + keyObj.created, keyObj.pass);
    } else {
      keyObj.text = this.cryptoService.decrypt(this._masterKey + keyObj.created, keyObj.text);
    }
  }

  /** tell the list view that the map of key changed */
  private triggerUpdate() {
    this.dataMapUpdated.emit(this._data.mapData);
  }

  /** generates Obj for save */
  private genarateSaveObj(): SamModel{
    let tmpObj = {} as SamModel;
    tmpObj.loginCount = this._data.loginCount;
    tmpObj.version = AmConst.sam_version;
    tmpObj.encryptedData = JSON.stringify(Array.from(this._data.mapData));
    return tmpObj
  }
  
  /** encrypt important data twice */
  private encryptKeyObj(keyObj: KeyObjModel) {
    if (keyObj.type === 'Account') {
      keyObj.user = this.cryptoService.encrypt(this._masterKey + keyObj.created, keyObj.user);
      keyObj.pass = this.cryptoService.encrypt(this._masterKey + keyObj.created, keyObj.pass);
    } else {
      keyObj.text = this.cryptoService.encrypt(this._masterKey + keyObj.created, keyObj.text);
    }
  }

  private openSnackBarUndo(deletedData: KeyObjModel) {
    this.snackBar.open(deletedData.type + AmConst.deleted, AmConst.undo, {duration: 200000}).onAction().subscribe(() => {
      this._data.mapData.set(deletedData.created, deletedData);
      this.saveKeyLocalStorage();
    });
  }

  // test
  testKey() {
    for (let i = 0; i < 10; i++) {
      const tmp = new KeyObjModel();
      tmp.type = 'Account';
      tmp.title = i + '';
      tmp.user = i + '';
      tmp.pass = i + '';
      this._data.mapData.set(i, tmp);
    }
  }
}
