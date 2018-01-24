import { Component, OnInit, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatMenuTrigger } from '@angular/material';
import { DialogShowkeyComponent } from '../dialog/dialog-showkey/dialog-showkey.component';
import { KeyObjModel } from '../model/key.model';
import { KeyService } from '../service/key.service';
import { Event } from '@angular/router';
import { DialogCreatekeyComponent } from '../dialog/dialog-createkey/dialog-createkey.component';
import { am_console } from '../app.util';

@Component({
  selector: 'app-keylist',
  // host: { class : 'ng-block'},
  templateUrl: './keylist.component.html',
  styleUrls: ['keylist.component.sass']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeylistComponent implements OnInit {
  @Input() type: string;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  dataMap: any;
  selectedKeyId: number;
  dataArray: KeyObjModel[] = [];

  constructor(private keyService: KeyService, private dialog: MatDialog) {
    am_console.log('keyList init');

  }

  ngOnInit() {
    am_console.log('keyList on init TYPE:' + this.type);
    this.setModel(this.keyService.getDataMap());

    // set Lister of update
    this.keyService.dataMapUpdated.subscribe((dataMap) => {
      am_console.log('KeyList Comp UPDATED Map:', dataMap);
      this.setModel(dataMap);
    });
  }

  setModel(map: Map<number, KeyObjModel>) {
    // filter origin map with type
    this.dataMap =  new Map(
      Array.from(map).filter(this.isSameType())
    );
    // workaround cause Angular can not handle MAP
    this.dataArray = Array.from(this.dataMap.values()) as KeyObjModel[];
  }

  // curring hell yeeah
  isSameType() {
    return ([key, data]) => data.type === this.type;
  }

  openKey(id: number) {
    am_console.log('open Key of with id' + id);
    /* let config: MatDialogConfig = {
      width: '500px'
    }; */
    this.dialog.open(DialogShowkeyComponent, {data: this.dataMap.get(id)});
  }

  openOption(event, keyId: number) {
    event.stopPropagation();
    this.selectedKeyId = keyId;
  }

  editData() {
    if (this.dataMap.has(this.selectedKeyId)) {
      am_console.log('edit: ' + this.selectedKeyId);
      this.dialog.open(DialogCreatekeyComponent, {data: this.dataMap.get(this.selectedKeyId)});
    }
  }

  deleteData() {
    if (this.dataMap.has(this.selectedKeyId)) {
      am_console.log('delete: ' + this.selectedKeyId);
      this.keyService.delete(this.selectedKeyId);
    }
  }
}
