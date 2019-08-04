import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignFilterComponent } from './student-assign-filter.component';

describe('StudentAssignFilterComponent', () => {
  let component: StudentAssignFilterComponent;
  let fixture: ComponentFixture<StudentAssignFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
