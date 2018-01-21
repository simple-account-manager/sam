import { Component, OnInit } from '@angular/core';
import { am_console } from '../app.util';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {

  faqs = [];
  filteredFaqs = [];
  input = '';
  private searchStr = '';

  constructor() { 
    // TODO ignore html tags
    this.faqs = constFAQs.map((faq) => {
      faq['q_low'] = faq.q.toLowerCase();
      faq['a_low'] = this.stripHtml(faq.a).toLowerCase();
      return faq;
    })
    this.filteredFaqs = this.faqs;
  }

  ngOnInit() {
  }

  search() {
    if (this.input.length > 2) {
      const input_low = this.input.toLowerCase();
      if (input_low !== this.searchStr) {
        // search only if the input has changed
        this.searchStr = input_low;
        this.searchImpl();
      }
    } else {
      this.searchStr = '';
      this.filteredFaqs = this.faqs;
    }
  }
  
  searchImpl() {
    this.filteredFaqs = this.faqs.filter((faq) => {
      return faq.q_low.includes(this.searchStr) || faq.a_low.includes(this.searchStr);
    })
  }

  stripHtml(html) {
    const temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
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
