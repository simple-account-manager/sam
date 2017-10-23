import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogImportTextComponent } from './dialog-import-text.component';

describe('DialogImportTextComponent', () => {
  let component: DialogImportTextComponent;
  let fixture: ComponentFixture<DialogImportTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogImportTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogImportTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
