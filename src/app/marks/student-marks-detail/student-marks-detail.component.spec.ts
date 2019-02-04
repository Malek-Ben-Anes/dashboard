import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMarksDetailComponent } from './student-marks-detail.component';

describe('StudentMarksDetailComponent', () => {
  let component: StudentMarksDetailComponent;
  let fixture: ComponentFixture<StudentMarksDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMarksDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMarksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
