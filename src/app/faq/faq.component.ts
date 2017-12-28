import { Component, OnInit } from '@angular/core';
import { am_console } from '../app.util';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {

  faqs = constFAQs;

  constructor() { }

  ngOnInit() {
  }

}

const constFAQs = [
  {
    q: 'What the hell is a masterkey?',
    a: 'Is the key to encrypt and decrypt your whole data in this applaction. So be <strong>very very</strong> careful with it!'
  },
  {
    q: 'Which encryption standard is been used?',
    a: 'AES'
  },
]
