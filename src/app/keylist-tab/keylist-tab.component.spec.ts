import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeylistTabComponent } from './keylist-tab.component';

describe('KeylistTabComponent', () => {
  let component: KeylistTabComponent;
  let fixture: ComponentFixture<KeylistTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeylistTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeylistTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
