import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLinkComponent } from './info-link.component';

describe('InfoLinkComponent', () => {
  let component: InfoLinkComponent;
  let fixture: ComponentFixture<InfoLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
