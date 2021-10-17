import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedButtonComponent } from './pinned-button.component';

describe('PinnedButtonComponent', () => {
  let component: PinnedButtonComponent;
  let fixture: ComponentFixture<PinnedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
