import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KeylistComponent } from './keylist/keylist.component';
import {RouterModule} from "@angular/router";
import { routes } from "./app.routes";
import { AuthService } from "./service/auth.service";
import { KeyService } from "./service/key.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule, MatCardModule, MatButtonModule, MatInputModule, MatIconModule, MatSnackBarModule,
  MatListModule, MatDialogModule, MatMenuModule, MatTabsModule, MatSelectModule, MatExpansionModule
} from "@angular/material";
import { NavComponent } from './nav/nav.component';
import { CryptoService } from "./service/crypto.service";
import { DialogShowkeyComponent } from './dialog/dialog-showkey/dialog-showkey.component';
import { KeylistTabComponent } from './keylist-tab/keylist-tab.component';
import { DialogCreatekeyComponent } from './dialog/dialog-createkey/dialog-createkey.component';
import { ExportService } from "./service/export.service";
import { ImportService } from "./service/import.service";
import { FaqComponent } from './faq/faq.component';
import { DialogImportTextComponent } from './dialog/dialog-import-text/dialog-import-text.component';
import { AboutComponent } from './about/about.component';
import { SnackbarService } from 'app/service/snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KeylistComponent,
    NavComponent,
    DialogShowkeyComponent,
    KeylistTabComponent,
    DialogCreatekeyComponent,
    FaqComponent,
    DialogImportTextComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatExpansionModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [
    DialogShowkeyComponent,
    DialogCreatekeyComponent,
    DialogImportTextComponent
  ],
  providers: [AuthService, KeyService, CryptoService, ExportService, ImportService, SnackbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
