import {Component, OnInit, AfterViewInit} from '@angular/core';
import {am_console} from '../app.util';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const hash = location.hash;
    if (hash !== '') {
      location.hash = '';
      am_console.log('has was' + hash);
      document.getElementById(hash.substring(1)).click();
      location.hash = hash;
    }
  }

}
