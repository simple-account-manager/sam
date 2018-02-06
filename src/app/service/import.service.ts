import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { KeyService } from './key.service';
import { KeyObjModel } from '../model/key.model';
import { am_console } from '../app.util';
import { AmConst } from '../util/am.const';

@Injectable()
export class ImportService {
  
  constructor(private keyService: KeyService, private snackbarService: SnackbarService) { }
  
  mergeImportedKeys(importStr: string) {
    const display_msg_duration = 4000;

    try {
      // prepare/parse importStr
      importStr = this.extractEncryptedStr(importStr);

      const importObj = this.keyService.generateObjFromEncryped(importStr);
      const dataMap = this.keyService.getDataMap();

      let countAdd = 0;
      let countExists = 0;

      importObj.mapData.forEach((value: KeyObjModel, key: number) => {
        if (!dataMap.has(key)) {
          dataMap.set(key, value);
          countAdd++;
        } else {
          countExists++;
        }
      });

      if (countAdd === 0) {
        this.snackbarService.openSnackBar(AmConst.import_nothing_imported, display_msg_duration);
      } else {
        // some items are added to the map > save it!
        this.keyService.saveKeyLocalStorage();
        this.snackbarService.openSnackBar(countAdd + AmConst.import_success, display_msg_duration);
      }

      if (countExists > 0) {
        setTimeout(() => {
          this.snackbarService.openSnackBarExtraClass(countExists + AmConst.import_items_exists, display_msg_duration, ['snackWarning']);
        }, display_msg_duration);
      }
    } catch (e) {
      this.snackbarService.openSnackBarExtraClass(AmConst.import_error, 12000, ['snackError']);
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
