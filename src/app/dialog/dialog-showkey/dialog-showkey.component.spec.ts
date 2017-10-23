import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowkeyComponent } from './dialog-showkey.component';

describe('DialogShowkeyComponent', () => {
  let component: DialogShowkeyComponent;
  let fixture: ComponentFixture<DialogShowkeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowkeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
