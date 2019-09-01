import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignComponent } from './student-assign.component';

describe('StudentAssignComponent', () => {
  let component: StudentAssignComponent;
  let fixture: ComponentFixture<StudentAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
