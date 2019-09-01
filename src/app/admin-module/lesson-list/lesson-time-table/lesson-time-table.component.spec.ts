import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTimeTableComponent } from './lesson-time-table.component';

describe('LessonTimeTableComponent', () => {
  let component: LessonTimeTableComponent;
  let fixture: ComponentFixture<LessonTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
