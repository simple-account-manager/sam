import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { KeyService } from './key.service';
import { am_console } from '../app.util';
import { AmConst } from '../util/am.const';

@Injectable()
export class ExportService {

  constructor(private keyService: KeyService, private snackbarService: SnackbarService) { }

  exportImpl() {
    const keyObj = localStorage.getItem(this.keyService.KEY);
    am_console.log('--> Export this: ', keyObj);
    const a = document.createElement('a')
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + AmConst.export_file_prefix + keyObj);
    a.setAttribute('download', 'AM-' + this.genarateDateStr() + '.sam');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackbarService.openSnackBar(AmConst.export_msg, 3000);
  }

  private genarateDateStr() {
    const now = new Date()
    return now.getFullYear() + '-' +
      this.format(now.getMonth() + 1) + '-' +
      this.format(now.getDate()) + '-' +
      this.format(now.getHours()) + '-' +
      this.format(now.getMinutes()) + '-' +
      this.format(now.getSeconds())
  }

  private format(c: number): string {
    if (c < 10) {
      return  '0' + c
    } else {
      return '' + c
    }
  }


}
