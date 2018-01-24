import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { DialogCreatekeyComponent } from '../dialog/dialog-createkey/dialog-createkey.component';

@Component({
  selector: 'app-keylist-tab',
  templateUrl: './keylist-tab.component.html',
  styleUrls: ['./keylist-tab.component.sass']
})
export class KeylistTabComponent implements OnInit {

  currentTab = 'Account';
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onSelect(event: MatTabChangeEvent) {
    this.currentTab = event.tab.textLabel;
  }

  // TODO open saved tab
  openCreateDialog() {
    this.dialog.open(DialogCreatekeyComponent, {data: {type: this.currentTab}});
  }
}
