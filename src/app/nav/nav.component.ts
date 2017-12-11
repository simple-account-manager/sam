import {Component, OnInit, Input} from '@angular/core';
import {ExportService} from '../service/export.service';
import {ImportService} from '../service/import.service';
import {KeyService} from '../service/key.service';
import {CryptoService} from '../service/crypto.service';
import {KeyObjModel} from '../model/key.model';
import {MatDialog} from '@angular/material';
import {DialogImportTextComponent} from '../dialog/dialog-import-text/dialog-import-text.component';
import {am_console} from '../app.util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  @Input() auth: boolean;
  navToggler: HTMLElement;

  constructor(private exportService: ExportService,
              private importService: ImportService,
              private dialog: MatDialog) { }

  ngOnInit() {
    am_console.log('OnInit NAV: ');
    this.navToggler = document.getElementById('navToggler');
  }

  export() {
    this.exportService.exportImpl();
    this.navToggler.click();
  }

  triggerImport() {
    document.getElementById('importBtn').click();
  }

  openTextImportDialog() {
    this.dialog.open(DialogImportTextComponent).afterClosed()
      .subscribe((result: string) => {
        this.importService.mergeImportedKeys(result);
      });
    this.navToggler.click();
  }

  fileChanged(e: Event) {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const reader: FileReader = new FileReader();
    reader.onload = () => {
      this.importService.mergeImportedKeys(reader.result);
      this.navToggler.click();
    };
    reader.readAsText(target.files[0]);
  }
}
