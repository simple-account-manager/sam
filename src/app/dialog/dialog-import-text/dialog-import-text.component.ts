import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { am_console } from '../../app.util';
import { AmConst } from '../../util/am.const';

@Component({
  selector: 'app-dialog-import-text',
  templateUrl: './dialog-import-text.component.html',
  styleUrls: ['./dialog-import-text.component.sass']
})
export class DialogImportTextComponent implements OnInit {

  error = '';
  text = '';

  constructor(public dialogRef: MatDialogRef<DialogImportTextComponent>) { }

  ngOnInit() {
  }

  import(event: Event) {
    am_console.log('--> copied Text' + this.text);
    if (this.text === '') {
      event.stopPropagation();
      this.error = AmConst.validate_required;
    } else {
      this.dialogRef.close(this.text);
    }
  }

}
