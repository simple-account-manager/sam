import { Component, OnInit, Inject } from '@angular/core';
import { KeyObjModel } from '../../model/key.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { KeyService } from '../../service/key.service';
import { am_console } from '../../app.util';
import { AmConst } from '../../util/am.const';
import { SnackbarService } from 'app/service/snackbar.service';

@Component({
  selector: 'app-dialog-createkey',
  templateUrl: './dialog-createkey.component.html',
  styleUrls: ['./dialog-createkey.component.sass']
})
export class DialogCreatekeyComponent implements OnInit {

  hidePw = true;
  // keeps all error msg of the fields
  error: ErrorKey = new ErrorKey();
  keyObj: KeyObjModel = new KeyObjModel();
  mode = '';


  constructor(@Inject(MAT_DIALOG_DATA) private data: KeyObjModel,
              public dialogRef: MatDialogRef<DialogCreatekeyComponent>,
              private keyService: KeyService,
              private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
    am_console.log('Dialog onInit ', this.data);
    if (typeof this.data.created === 'undefined') {
      this.keyObj.type = this.data.type;
      this.mode = 'create';
      am_console.log('Dialog Createkey data.type was undefined');
    } else {
      // deserialize keyObj
      this.keyObj = JSON.parse(JSON.stringify(this.data));
      // decrypt
      this.keyService.decryptKeyObj(this.keyObj);
      this.mode = 'edit';
    }
  }

  save(event) {
    this.validateData(this.keyObj);
    am_console.log('save Error: ' + this.error.error(), this.error);

    if (this.error.error()) {
      // prevent auto closing
      event.stopPropagation();
    } else {
      this.cleanUpData(this.keyObj);
      const isNewObj = typeof this.keyObj.created === 'undefined';
      this.keyService.saveKeyToMap(this.keyObj);
      this.dialogRef.close();
      // show save|update msg
      this.snackbarService.openSnackBar(`${this.keyObj.type} ${isNewObj ? AmConst.saved : AmConst.updated}`, 2000);
    }
  }

  cleanUpData(keyObj: KeyObjModel) {
    if (keyObj.type === 'Account') {
      delete keyObj.text;
    } else {
      delete keyObj.user;
      delete keyObj.pass;
    }
  }

  validateData(keyObj: KeyObjModel) {
    this.error.title = this.isEmpty(keyObj.title) ? AmConst.validate_title_required : '';
    if (keyObj.type === 'Account') {
      this.error.user = this.isEmpty(keyObj.user) ? AmConst.validate_user_required : '';
      this.error.pass = this.isEmpty(keyObj.pass) ? AmConst.validate_pass_required : '';
      this.error.text = '';
    } else {
      this.error.text = this.isEmpty(keyObj.text) ? AmConst.validate_text_required : '';
      this.error.user = '';
      this.error.pass = '';
    }
  }

  isEmpty(input: string) {
    return typeof input === 'undefined' || input === '';
  }
}

class ErrorKey {
  title = '';
  user = '';
  pass = '';
  text = '';

  error() {
    return this.title !== '' || this.user !== '' || this.pass !== '' || this.text !== '';
  }
}
