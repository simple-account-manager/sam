import { Injectable } from '@angular/core';
import {KeyService} from './key.service';
import {KeyObjModel} from '../model/key.model';
import {am_console} from '../app.util';
import { AmConst } from '../util/am.const';

@Injectable()
export class ImportService {

  constructor(private keyService: KeyService) { }

  mergeImportedKeys(importStr: string) {
    try {
      am_console.log('--> Imported String: ', importStr);
      // prepare/parse importStr
      importStr = this.extractEncryptedStr(importStr);
      am_console.log('2--> Imported String: ', importStr);

      const importMap = this.keyService.generateMapFromEncryped(importStr);
      const keyMap = this.keyService.getDataMap();

      let countAdd = 0;
      let countExists = 0;
      let snackMsg = '';

      importMap.forEach((value: KeyObjModel, id: number) => {
        if (!keyMap.has(id)) {
          keyMap.set(id, value);
          countAdd++;
        } else {
          countExists++;
        }
      });
      if (countAdd > 0) {
        this.keyService.saveKeyLocalStorage();
        snackMsg = countAdd + AmConst.import_success;
      } else {
        snackMsg = AmConst.import_nothing_imported;
      }

      this.keyService.openSnackBar(snackMsg, 4000);
      if (countExists > 0) {
        setTimeout(() => {
          this.keyService.openSnackBarExtraClass(countExists + AmConst.import_items_exists, 4000, ['snackWarning']);
        }, 4000);
      }
    } catch (e) {
      this.keyService.openSnackBarExtraClass(AmConst.import_error, 6000, ['snackError']);
    }
    // form renders later! clean up form in order to reimport
    (document.getElementById('importForm') as HTMLFormElement).reset();
  }

  extractEncryptedStr(importedStr: string): string {
    if (importedStr.indexOf('****') !== -1) {
      return importedStr.split('****')[1].trim();
    } else {
      // seems broken :/ lets try :D
      return importedStr;
    }
  }

}
