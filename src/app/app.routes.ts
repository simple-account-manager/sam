import { AboutComponent } from './about/about.component';
import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthService} from './service/auth.service';
import {KeylistTabComponent} from './keylist-tab/keylist-tab.component';
import {FaqComponent} from './faq/faq.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'keylist', canActivate: [AuthService], component: KeylistTabComponent}
]
