import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherSubjectListComponent } from './teacher-subject-list.component';

describe('SubjectListComponent', () => {
  let component: TeacherSubjectListComponent;
  let fixture: ComponentFixture<TeacherSubjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherSubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherSubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
