import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreatekeyComponent } from './dialog-createkey.component';

describe('DialogCreatekeyComponent', () => {
  let component: DialogCreatekeyComponent;
  let fixture: ComponentFixture<DialogCreatekeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCreatekeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreatekeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
