import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDetailComponent } from './mark-detail.component';

describe('MarkDetailComponent', () => {
  let component: MarkDetailComponent;
  let fixture: ComponentFixture<MarkDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
