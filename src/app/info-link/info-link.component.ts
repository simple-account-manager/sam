import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-info-link',
  templateUrl: './info-link.component.html',
  styleUrls: ['./info-link.component.sass']
})
export class InfoLinkComponent implements OnInit {
  @Input() id: string;
  @Input() linktext: string;

  show = false;

  constructor() { }

  ngOnInit() {
  }
  // workaround
  showDesc(event: Event) {
    this.show = !this.show;
    location.hash = this.id;
    event.preventDefault();
  }

}
