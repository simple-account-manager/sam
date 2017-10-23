import {Component, OnInit, Inject} from '@angular/core';
import {KeyObjModel} from '../../model/key.model';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {KeyService} from '../../service/key.service';
import {am_console} from '../../app.util';
import { AmConst } from '../../util/am.const';

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


  constructor(@Inject(MD_DIALOG_DATA) private data: KeyObjModel,
              public dialogRef: MdDialogRef<DialogCreatekeyComponent>,
              private keyService: KeyService
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
  /*
  checkOnChange(keyObj) {
    am_console.log('checkOnChange: ' + keyObj.title);
    if (this.keyService.getDataMap().has(keyObj.title)) {
      this.error.title = 'Title exists already';
    } else {
      this.error.title = '';
    }
  }*/

  save(event) {
    this.validateData(this.keyObj);
    am_console.log('save Error: ' + this.error.error(), this.error);

    if (this.error.error()) {
      // prevent auto closing
      event.stopPropagation();
    } else {
      this.cleanUpData(this.keyObj);
      this.keyService.saveKeyToMap(this.keyObj);
      this.dialogRef.close();
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
    this.error.title = this.isEmpty(keyObj.title) ? AmConst.validateTitleRequired : '';
    if (keyObj.type === 'Account') {
      this.error.user = this.isEmpty(keyObj.user) ? AmConst.validateUserRequired : '';
      this.error.pass = this.isEmpty(keyObj.pass) ? AmConst.validatePassRequired : '';
      this.error.text = '';
    } else {
      this.error.text = this.isEmpty(keyObj.text) ? AmConst.validateTextRequired : '';
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
