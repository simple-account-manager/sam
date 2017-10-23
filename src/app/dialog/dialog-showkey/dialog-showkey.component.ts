import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {KeyObjModel} from '../../model/key.model';
import {KeyService} from '../../service/key.service';

@Component({
  selector: 'app-dialog-showkey',
  templateUrl: './dialog-showkey.component.html',
  styleUrls: ['./dialog-showkey.component.sass']
})
export class DialogShowkeyComponent implements OnInit {
  keyObj: KeyObjModel = new KeyObjModel();

  constructor(@Inject(MD_DIALOG_DATA) private data: KeyObjModel, private keyService: KeyService) { }

  ngOnInit() {
    // deserialize keyObj
    this.keyObj = JSON.parse(JSON.stringify(this.data));
    // decrypt
    this.keyService.decryptKeyObj(this.keyObj);
  }

}
