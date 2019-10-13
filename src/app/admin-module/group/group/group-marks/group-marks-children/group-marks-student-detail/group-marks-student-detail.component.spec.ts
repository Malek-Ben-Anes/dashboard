import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMarksStudentDetailComponent } from './group-marks-student-detail.component';

describe('GroupMarksStudentDetailComponent', () => {
  let component: GroupMarksStudentDetailComponent;
  let fixture: ComponentFixture<GroupMarksStudentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMarksStudentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMarksStudentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
